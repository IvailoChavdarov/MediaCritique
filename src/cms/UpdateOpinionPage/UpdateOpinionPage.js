import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditorWrapper from "../Editors/EditorWrapper/EditorWrapper";
import DOMPurify from "dompurify";
import Loader from "../../components/Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";

const updateOpinionSchema = yup.object({
  title: yup.string().required("Заглавието е задължително"),
  imageUrl: yup.string().url("Моля въведете валиден URL"),
  catch: yup.string().required("Краткото обобщение е задължително."),
  references: yup.array().of(
    yup.object().shape({
      url: yup.string()
        .url("Въведете валиден URL")
        .required("URL е задължителен"),
      title: yup.string()
        .required("Заглавието е задължително")
        .max(100, "Максимум 100 символа")
    })
  )
});

export default function UpdateOpinionPage() {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [findOpinionIsLoading, setFindOpinionIsLoading] = useState(false);
  const [requestState, setRequestState] = useState();
  const { id } = useParams();
  const [isFound, setIsFound] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateOpinionSchema),
    defaultValues: {
      references: [{ url: "", title: "" }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references"
  });

  useEffect(() => {
    setFindOpinionIsLoading(true)
    const fetchOpinion = async () => {
      try {
        const docRef = doc(db, "opinions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset({
            title: data.title,
            imageUrl: data.imageUrl,
            catch: data.catch,
            references: data.references?.length > 0 ? data.references : [{ url: "", title: "" }],
          });
          setHtmlContent(data.content || "");
          setIsFound(true)
        } else {
          setIsFound(false)
        }
      } catch (err) {
        console.error(err);
        setRequestState({
          id: Date.now(),
          state: "failure",
          message: "Грешка при зареждане на мнението!",
        });
      } finally {
        setFindOpinionIsLoading(false);
      }
    };

    fetchOpinion();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const cleanHtml = DOMPurify.sanitize(htmlContent, {
      ADD_TAGS: ["iframe", "img"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "alt", "class", "target", "cite"],
    });

    try {
      const docRef = doc(db, "opinions", id);
      await updateDoc(docRef, {
        title: data.title,
        imageUrl: data.imageUrl,
        catch: data.catch,
        content: cleanHtml,
        references: data.references,
        lastUpdated: new Date(),
      });

      setRequestState({
        id: Date.now(),
        state: "success",
        message: "Мнението е обновено успешно!",
      });
    } catch (err) {
      console.error(err);
      setRequestState({
        id: Date.now(),
        state: "failure",
        message: "Грешка при обновяване на мнението!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
  };

  if(findOpinionIsLoading) return <Loader/>

  if(!isFound) return <NotFoundPage/>

  return (
    <>
      {isLoading && <Loader />}
      <h1>Редактирай мнение</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={`cms-form ${isLoading ? 'hidden' : ''}`}>
        <div>
          <label>Заглавие<span className="required-indicator">*</span></label>
          <input type="text" {...register("title")} onChange={handleInputChange} />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div>
          <label>Главна снимка (URL)<span className="required-indicator">*</span></label>
          <input type="text" {...register("imageUrl")} onChange={handleInputChange} />
          {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <label>Кратко обобщение<span className="required-indicator">*</span></label>
          <input type="text" {...register("catch")} onChange={handleInputChange} />
          {errors.catch && <p className="error">{errors.catch.message}</p>}
        </div>
        <div>
          <label>Съдържание<span className="required-indicator">*</span></label>
          <EditorWrapper content={htmlContent} setContent={setHtmlContent} />
        </div>
        <div className="references">
          <h3>Референции</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="reference-item">
              <div>
                <label>URL</label>
                <input
                  type="url"
                  {...register(`references.${index}.url`)}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
                {errors.references?.[index]?.url && (
                  <p className="error">{errors.references[index].url.message}</p>
                )}
              </div>
              <div>
                <label>Заглавие</label>
                <input
                  type="text"
                  {...register(`references.${index}.title`)}
                  onChange={handleInputChange}
                  placeholder="Описание"
                  maxLength={100}
                />
                {errors.references?.[index]?.title && (
                  <p className="error">{errors.references[index].title.message}</p>
                )}
              </div>
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="remove-btn">
                  Премахни
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append({ url: "", title: "" })} className="add-btn">
            Добави референция
          </button>
        </div>

        <button type="submit">Обнови</button>
      </form>

      {requestState && (
        <ToastNotification
          key={requestState.id}
          state={requestState.state}
          text={requestState.message}
        />
      )}
    </>
  );
}

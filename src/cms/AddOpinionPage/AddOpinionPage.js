import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditorWrapper from "../Editors/EditorWrapper/EditorWrapper";
import DOMPurify from 'dompurify';
import Loader from "../../components/Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import { getAuth } from "firebase/auth";
import '../../styles/shared/cms.scss'

const addOpinionSchema = yup.object({
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

export default function AddOpinionPage() {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestState, setRequestState] = useState();
  const { 
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(addOpinionSchema),
    defaultValues: {
      references: [{ url: "", title: "" }]
    }
  });

  const [currentUser, setCurrentUser] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references"
  });

  const onSubmit = async (data) => {
    setIsLoading(true)
    const cleanHtml = DOMPurify.sanitize(htmlContent, {
      ADD_TAGS: ['iframe', 'img'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src', 'alt', 'class', 'target', 'cite'],
    });
    
    // const formData = {
    //   ...data,
    //   content: cleanHtml
    // };
    console.log(currentUser)
    // console.log("Form data:", formData);
    try{
        await addDoc(collection(db, "opinions"), {
            title: data.title,
            catch: data.catch,
            imageUrl: data.imageUrl,
            content: cleanHtml,
            references: data.references,
            author: currentUser,
            datePosted: new Date(),
            isDeleted: false
        });

        setRequestState({
            state: "success",
            message: "Мнението е добавено успешно!",
            id: Date.now(),
        });

        reset()
    }
    catch (err) {
        console.log(err)
        setRequestState({
        id: Date.now(),
        state: "failure",
        message: "Проблем в добавянето на мнение!"
        });
    }
    finally{
        setIsLoading(false)
    }

    reset()
  };

  const handleInputChange = (e) => {
    if (e.target.value) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
  };

  useEffect(()=>{
    const getCurrentUserNames = async () =>{
        const auth = getAuth();
        const userUid = auth.currentUser.uid;
        const docRef = doc(db, "editors", userUid);
        const docSnap = await getDoc(docRef);
        setCurrentUser(docSnap.data().name)
    }
    getCurrentUserNames()
  }, [])

  return (
    <>
    {isLoading && <Loader/>}
    <h1>Добави мнение</h1>
    <form onSubmit={handleSubmit(onSubmit)} className={`cms-form ${isLoading? 'hidden': ''}`}>
      {/* Existing fields */}
      <div>
        <label>Заглавие<span className="required-indicator">*</span></label>
        <input 
          type="text" 
          {...register("title")} 
          onChange={handleInputChange}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label>Главна снимка (URL)<span className="required-indicator">*</span></label>
        <input 
          type="text" 
          {...register("imageUrl")} 
          onChange={handleInputChange}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <label>Кратко обобщение<span className="required-indicator">*</span></label>
        <input 
          type="text" 
          {...register("catch")} 
          onChange={handleInputChange}
        />
        {errors.catch && <p className="error">{errors.catch.message}</p>}
      </div>
      <div>
        <label>Съдържание<span className="required-indicator">*</span></label>
        <EditorWrapper content={htmlContent} setContent={setHtmlContent} />
      </div>
      {/* References section */}
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
              <button
                type="button"
                onClick={() => remove(index)}
                className="remove-btn"
              >
                Премахни
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ url: "", title: "" })}
          className="add-btn"
        >
          Добави референция
        </button>
        
        {errors.references?.message && (
          <p className="error">{errors.references.message}</p>
        )}
      </div>

      <button type="submit">Запази</button>
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
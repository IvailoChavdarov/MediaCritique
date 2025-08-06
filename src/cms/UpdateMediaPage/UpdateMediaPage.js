import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DOMPurify from "dompurify";
import Loader from "../../components/Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import SimpleEditor from "../Editors/SimpleEditor/SimpleEditor";
import { useParams } from "react-router-dom";

const mediaSchema = yup.object({
  name: yup.string().required("Името е задължително"),
  imgUrl: yup.string().required("Логото е задължително").url("Моля въведете валиден URL за лого"),
  url: yup.string().url("Моля въведете валиден URL на медията"),
  note: yup.string().required("Краткото обобщение е задължително."),
  matchUrl: yup.string().required("URL за намиране е задължителен"),
  riskLevel: yup
    .number()
    .oneOf([0, 1, 2, 3, 4, null], "Изберете валидно ниво на риск")
    .nullable()
    .default(null),
  references: yup.array().of(
    yup.object().shape({
      url: yup.string().url("Въведете валиден URL").required("URL е задължителен"),
      title: yup.string().required("Заглавието е задължително").max(100, "Максимум 100 символа"),
    })
  ),
});

export default function UpdateMediaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [requestState, setRequestState] = useState();
  const [historyHTML, setHistoryHTML] = useState("");
  const [financingHTML, setFinancingHTML] = useState("");
  const [ownerHTML, setOwnerHTML] = useState("");
  const [employeesHTML, setEmployeesHTML] = useState("");
  const [scandalsHTML, setScandalsHTML] = useState("");
  const [doubtsHTML, setDoubtsHTML] = useState("");
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(mediaSchema),
    defaultValues: {
      references: [{ url: "", title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  // Load existing media data
  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "medias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset({
            name: data.name,
            url: data.url,
            imgUrl: data.imgUrl,
            note: data.note,
            matchUrl: data.matchUrl ?? "none...",
            riskLevel: data.riskLevel ?? null,
            references: data.references?.length ? data.references : [{ url: "", title: "" }],
          });
          setHistoryHTML(data.history || "");
          setFinancingHTML(data.financing || "");
          setOwnerHTML(data.owner || "");
          setEmployeesHTML(data.employees || "");
          setScandalsHTML(data.scandals || "");
          setDoubtsHTML(data.doubts || "");
        } else {
          setRequestState({
            state: "failure",
            message: "Медията не беше намерена.",
            id: Date.now(),
          });
        }
      } catch (err) {
        console.error(err);
        setRequestState({
          state: "failure",
          message: "Грешка при зареждането на медията.",
          id: Date.now(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMedia();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const clean = (html) => DOMPurify.sanitize(html || "");

    try {
      await updateDoc(doc(db, "medias", id), {
        name: data.name,
        url: data.url,
        imgUrl: data.imgUrl,
        note: data.note,
        riskLevel: data.riskLevel,
        references: data.references,
        matchUrl: data.matchUrl,
        history: clean(historyHTML),
        financing: clean(financingHTML),
        owner: clean(ownerHTML),
        employees: clean(employeesHTML),
        scandals: clean(scandalsHTML),
        doubts: clean(doubtsHTML),
        lastUpdated: new Date(),
      });

      setRequestState({
        state: "success",
        message: "Медията беше успешно обновена!",
        id: Date.now(),
      });
    } catch (err) {
      console.error(err);
      setRequestState({
        state: "failure",
        message: "Грешка при обновяването на медията.",
        id: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    e.target.classList.toggle("active", !!e.target.value);
  };

  return (
    <>
      {isLoading && <Loader />}
      <h1>Редактирай медия</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={`cms-form ${isLoading ? "hidden" : ""}`}>
        <div>
          <label>Име<span className="required-indicator">*</span></label>
          <input type="text" {...register("name")} onChange={handleInputChange} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label>URL<span className="required-indicator">*</span></label>
          <input type="text" {...register("url")} onChange={handleInputChange} />
          {errors.url && <p className="error">{errors.url.message}</p>}
        </div>

        <div>
          <label>Част от URL, по която да се ориентира разширението<span className="required-indicator">*</span></label>
          <input type="text" {...register("matchUrl")} onChange={handleInputChange} />
          {errors.matchUrl && <p className="error">{errors.matchUrl.message}</p>}
        </div>

        <div>
          <label>Лого<span className="required-indicator">*</span></label>
          <input type="text" {...register("imgUrl")} onChange={handleInputChange} />
          {errors.imgUrl && <p className="error">{errors.imgUrl.message}</p>}
        </div>

        <div>
          <label>Ниво на риск</label>
          <select {...register("riskLevel")} className="risk-select">
            <option value={null}>Ниво на риск</option>
            <option value={0}>Няма</option>
            <option value={1}>Ниско</option>
            <option value={2}>Средно</option>
            <option value={3}>Високо</option>
            <option value={4}>Екстремно</option>
          </select>
          {errors.riskLevel && <p>{errors.riskLevel.message}</p>}
        </div>

        <div>
          <label>Кратко обобщение<span className="required-indicator">*</span></label>
          <textarea {...register("note")} onChange={handleInputChange} />
          {errors.note && <p className="error">{errors.note.message}</p>}
        </div>

        <div className="simple-editor">
            <label>История:</label>
            <SimpleEditor content={historyHTML} onChange={setHistoryHTML} />
        </div>
        <div className="simple-editor">
            <label>Финансиране:</label>
            <SimpleEditor content={financingHTML} onChange={setFinancingHTML} />
        </div>
        <div className="simple-editor">
            <label>Собственик:</label>
            <SimpleEditor content={ownerHTML} onChange={setOwnerHTML} />
        </div>
        <div className="simple-editor">
            <label>Водещи лица:</label>
            <SimpleEditor content={employeesHTML} onChange={setEmployeesHTML} />
        </div>
        <div className="simple-editor">
            <label>Съмнения:</label>
            <SimpleEditor content={doubtsHTML} onChange={setDoubtsHTML} />
        </div>
        <div className="simple-editor">
            <label>Скандали:</label>
            <SimpleEditor content={scandalsHTML} onChange={setScandalsHTML} />
        </div>

        <div className="references">
          <label>Референции</label>
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
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DOMPurify from 'dompurify';
import Loader from "../Loader/Loader";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import ToastNotification from "../ToastNotification/ToastNotification";
import SimpleEditor from "../SimpleEditor/SimpleEditor";

const addMediaSchema = yup.object({
    name: yup.string().required("Името е задължително"),
    imgUrl: yup.string().url("Моля въведете валиден URL за лого"),
    url: yup.string().url("Моля въведете валиден URL на медията"),
    matchUrl: yup.string().required("URL за намиране е задължителен"),
    note: yup.string().required("Краткото обобщение е задължително."),
    riskLevel: yup
        .number()
        .oneOf([0, 1, 2, 3, 4, null], 'Изберете валидно ниво на риск')
        .nullable()
        .default(null),
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

export default function AddMediaPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [requestState, setRequestState] = useState();
    const [historyHTML, setHistoryHTML] = useState();
    const [financingHTML, setFinancingHTML] = useState();
    const [ownerHTML, setOwnerHTML] = useState();
    const [employeesHTML, setEmployeesHTML] = useState();
    const [scandalsHTML, setScandalsHTML] = useState();
    const [doubtsHTML, setDoubtsHTML] = useState();
    const {register, control, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(addMediaSchema),
        riskLevel: {
            priority: null,
            references: [{ url: "", title: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "references"
    });
    const onSubmit = async (data) => {
        setIsLoading(true)

        const clean = (html) => DOMPurify.sanitize(html || "");

        try{
            await addDoc(collection(db, "medias"), {
                name: data.name,
                note: data.note,
                url: data.url,
                imgUrl: data.imgUrl,
                riskLevel: data.riskLevel,
                references: data.references,
                matchUrl: data.matchUrl,
                history: clean(historyHTML),
                financing: clean(financingHTML),
                owner: clean(ownerHTML),
                employees: clean(employeesHTML),
                scandals: clean(scandalsHTML),
                doubts: clean(doubtsHTML),
                datePosted: new Date(),
            });

            setRequestState({
                state: "success",
                message: "Медията бе добавена успешно!",
                id: Date.now(),
            });
            reset()
        }
        catch (err) {
            console.log(err)
            setRequestState({
                id: Date.now(),
                state: "failure",
                message: "Проблем в добавянето на медия!"
            });
        }
        finally{
            setIsLoading(false)
        }
    };

    const handleInputChange = (e) => {
        if (e.target.value) {
        e.target.classList.add("active");
        } else {
        e.target.classList.remove("active");
        }
    };

    return(
      <>
        {isLoading && <Loader/>}
        <h1>Добави медия</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={`cms-form ${isLoading? 'hidden': ''}`}>
            <div>
                <label>Име</label>
                <input 
                type="text" 
                {...register("name")} 
                onChange={handleInputChange}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div>
                <label>URL</label>
                <input 
                type="text" 
                {...register("url")} 
                onChange={handleInputChange}
                />
                {errors.url && <p className="error">{errors.url.message}</p>}
            </div>

            <div>
                <label>Част от URL, по която да се ориентира разширението</label>
                <input type="text" {...register("matchUrl")} onChange={handleInputChange} />
                {errors.matchUrl && <p className="error">{errors.matchUrl.message}</p>}
            </div>

            <div>
                <label>Лого</label>
                <input 
                type="text" 
                {...register("imgUrl")} 
                onChange={handleInputChange}
                />
                {errors.imgUrl && <p className="error">{errors.imgUrl.message}</p>}
            </div>
            <div>
                <select {...register("riskLevel")}>
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
                <label>Кратко обобщение</label>
                <textarea 
                {...register("note")} 
                onChange={handleInputChange}
                />
                {errors.note && <p className="error">{errors.note.message}</p>}
            </div>
            <div className="simple-editor">
                <h3>История:</h3>
                <SimpleEditor content={historyHTML} onChange={setHistoryHTML} />
            </div>
            <div className="simple-editor">
                <h3>Финансиране:</h3>
                <SimpleEditor content={financingHTML} onChange={setFinancingHTML} />
            </div>
            <div className="simple-editor">
                <h3>Собственик:</h3>
                <SimpleEditor content={ownerHTML} onChange={setOwnerHTML} />
            </div>
            <div className="simple-editor">
                <h3>Водещи лица:</h3>
                <SimpleEditor content={employeesHTML} onChange={setEmployeesHTML} />
            </div>
            <div className="simple-editor">
                <h3>Съмнения:</h3>
                <SimpleEditor content={doubtsHTML} onChange={setDoubtsHTML} />
            </div>
            <div className="simple-editor">
                <h3>Скандали:</h3>
                <SimpleEditor content={scandalsHTML} onChange={setScandalsHTML} />
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
    )
}
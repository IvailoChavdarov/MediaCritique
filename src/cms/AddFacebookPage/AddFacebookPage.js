import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../../components/Loader/Loader";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import ToastNotification from "../../components/ToastNotification/ToastNotification";

const addFacebookSchema = yup.object({
    name: yup.string().required("Наименованието е задължително"),
    referenceUrl: yup.string().url("Моля въведете валиден URL на медията"),
    matchUrl: yup.string().required("URL за намиране е задължителен"),
    note: yup.string().required("Краткото обобщение е задължително."),
    riskLevel: yup
        .number()
        .oneOf([0, 1, 2, 3, 4, null], 'Изберете валидно ниво на риск')
        .nullable()
        .default(null),
});

export default function AddFacebookPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [requestState, setRequestState] = useState();
    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(addFacebookSchema),
        riskLevel: {
            priority: null
        }
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        try{
            await addDoc(collection(db, "facebooks"), {
                name: data.name,
                note: data.note,
                referenceUrl: data.referenceUrl,
                riskLevel: data.riskLevel,
                matchUrl: data.matchUrl,
            });

            setRequestState({
                state: "success",
                message: "Фейсбук акаунтът бе добавен успешно!",
                id: Date.now(),
            });
            reset()
        }
        catch (err) {
            console.log(err)
            setRequestState({
                id: Date.now(),
                state: "failure",
                message: "Проблем в добавянето на фейсбук акаунт!"
            });
        }
        finally{
            setIsLoading(false)
        }
    };

    return(
      <>
        {isLoading && <Loader/>}
        <h1>Добави Фейсбук акаунт за следене</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={`cms-form ${isLoading? 'hidden': ''}`}>
            <div>
                <label>Име<span className="required-indicator">*</span></label>
                <input 
                type="text" 
                {...register("name")} 
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div>
                <label>URL за допълнителна информация</label>
                <input 
                type="text" 
                {...register("referenceUrl")} 
                />
                {errors.referenceUrl && <p className="error">{errors.referenceUrl.message}</p>}
            </div>

            <div>
                <label>Част от URL, по която да се ориентира разширението, започващо с /<span className="required-indicator">*</span></label>
                <input type="text" {...register("matchUrl")}/>
                {errors.matchUrl && <p className="error">{errors.matchUrl.message}</p>}
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
                <textarea 
                {...register("note")} 
                />
                {errors.note && <p className="error">{errors.note.message}</p>}
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
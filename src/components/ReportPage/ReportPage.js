import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { useState } from "react";
import './ReportPage.scss'
import ToastNotification from "../ToastNotification/ToastNotification";

const reportSchema = yup.object({
  subject: yup.string().required("Темата е задължителна."),
  referenceUrl: yup.string().url("Невалиден URL."),
  description: yup.string().required("Описанието е задължително."),
  email: yup.string().email("Невалиден имейл.").required("Имейлът е задължителен"),
});

export default function ReportPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [requestState, setRequestState] = useState();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(reportSchema),
    });
//  for RECAPTCHA
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const recaptchaRef = useRef();
    const onSubmit = async (data) => {
        setIsLoading(true)

        //for RECAPTCHA
        // if (!captchaVerified) {
        // TODO custom alert
        //   alert("Please verify you're not a robot!");
        //   return;
        // }

    try {
      await addDoc(collection(db, "reports"), {
        ...data,
        timestamp: new Date(),
      });
      // TODO custom alert
      reset();
      setRequestState({state: "success", message:"Сигналът е изпратен успешно!"})
      //for RECAPTCHA
        //   recaptchaRef.current.reset();
        //   setCaptchaVerified(false);

    }
    catch (error) {
        setRequestState({state: "failure", message:"Сигналът не беше изпратен успешно!"})
    }
    finally{
      setIsLoading(false)
    }
  };
    // for RECAPTCHA
    //   const onCaptchaChange = (token) => {
    //     setCaptchaVerified(!!token);
    //   };

    return(
        <>
        {isLoading && <Loader/>}
        <div className={`report-container${isLoading?" hidden" : ""}`}>
            <div className="report">
                <div className="report-explain">
                    <h1>
                        Сигнализирайте за съмнителни сайтове и публикации.
                    </h1>
                    <h2>
                        Можете да сигнализирате и за лъжи, които чувате често, за които да добавим информация в нашите продукти.
                    </h2>
                </div>
                <div className="report-form-container">
                    <h3>Въведете информация:</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className={`report-form`}>
                        <div>
                            <label>Email за ваш контакт <span className="required-indicator">*</span></label>
                            <input type="email" {...register("email")} />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label>Тема <span className="required-indicator">*</span></label>
                            <input {...register("subject")} />
                            {errors.subject && <p className="error">{errors.subject.message}</p>}
                        </div>
                        <div>
                            <label>Линк към проблемния сайт</label>
                            <input {...register("referenceUrl")} />
                            {errors.url && <p className="error">{errors.referenceUrl.message}</p>}
                        </div>
                        <div className="description-input">
                            <label>Описание <span className="required-indicator">*</span></label>
                            <textarea {...register("description")} rows={15} />
                            {errors.description && <p className="error">{errors.description.message}</p>}
                        </div>

                        {/* for ReCAPTCHA */}
                        {/*<ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="YOUR_RECAPTCHA_SITE_KEY"
                            onChange={onCaptchaChange}
                        />
                        + add disabled={!captchaVerified} to submit button
                        */}

                        <button className="call-to-action-button" disabled={isLoading} type="submit">
                            Изпрати
                        </button>
                    </form>
                </div>
            </div>
        </div>
        {requestState && <ToastNotification state={requestState.state} text={requestState.message}/>}
        </>
    )

}
//TODO:
//After publish go to https://www.google.com/recaptcha/admin/create and create key for reCAPTCHA for this project with publishing domain
//npm install react-google-recaptcha
//uncomment captcha handlers and replace RECAPTCHA_KEY with the key given
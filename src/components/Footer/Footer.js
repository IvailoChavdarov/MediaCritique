import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { useState } from "react";
import ToastNotification from "../ToastNotification/ToastNotification";
import './Footer.scss'
import { ImNewspaper } from "react-icons/im";
import { GiLightningShield } from "react-icons/gi";
import { IoIosTrendingDown  } from "react-icons/io";
import { AiOutlineDatabase } from "react-icons/ai";
import { MdWeb, MdOutlineEmail } from "react-icons/md";
import { FaGithubAlt, FaFacebookF } from "react-icons/fa6";
import { FaUserAstronaut, FaGitSquare, FaLinkedinIn, FaDiscord  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const contactSchema = yup.object({
  message: yup.string().required("Съобщението е задължително."),
  names: yup.string(),
  phone: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .notRequired()
    .matches(phoneRegExp, 'Телефонния номер не е валиден')
    .min(10, "Телефонния номер не е валиден")
    .max(10, "Телефонния номер не е валиден"),
  email: yup.string().email("Невалиден имейл.").required("Имейлът е задължителен"),
});

export default function Footer(){
    const [isLoading, setIsLoading] = useState(false);
    const [requestState, setRequestState] = useState();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(contactSchema),
    });
    //TODO: add captcha
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await addDoc(collection(db, "messages"), {
                ...data,
                timestamp: new Date(),
            });
            reset();
            setRequestState({state: "success", message:"Съобщението бе изпратено успешно!"})

        } 
        catch (error) {
            setRequestState({state: "failure", message:"Съобщението не беше изпратен успешно!"})
        }
        finally{
            setIsLoading(false)
        }
    };

    const handleInputChange = (event) =>{
        if(event.target.value && event.target.value!==""){
            event.target.classList.add("active")
        }
        else{
            if(event.target.classList.contains("active")){
                event.target.classList.remove("active")
            }
        }
    }

    return(
        <>
        {isLoading && <Loader/>}
        <footer className='page-footer'>
            <div className='footer-contacts'>
                <div className='contact-form-container'>
                    <h3>Изпратете ни съобщение :</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className={`contact-form`}>
                        <div className="user-contacts">
                            <div>
                                <label htmlFor="names">Имена</label>
                                <input type="text" {...register("names")} onChange={handleInputChange}/>
                                {errors.names && <p className="error">{errors.names.message}</p>}
                            </div>
                            <div>
                                <label>Email <span className="required-indicator">*</span></label>
                                <input {...register("email")} onChange={handleInputChange}/>
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label>Телефонен номер</label>
                            <input type="phone" {...register("phone")} onChange={handleInputChange}/>
                            {errors.phone && <p className="error">{errors.phone.message}</p>}
                        </div>
                        <div className="description-input">
                            <label>Какво искате да ни кажете? <span className="required-indicator">*</span></label>
                            <textarea {...register("message")} rows={15} onChange={handleInputChange}/>
                            {errors.message && <p className="error">{errors.message.message}</p>}
                        </div>
                        <button className="call-to-action-button" disabled={isLoading} type="submit">
                            Изпрати
                        </button>
                    </form>
                    {requestState && <ToastNotification state={requestState.state} text={requestState.message}/>}
                </div>
                <div className="contact-data">
                    <h3>Защо MediaCritique ?</h3>
                    <ul>
                        <li>
                            <ImNewspaper/>
                            Медиите са четвъртата власт и имат голямо влияние върху другите 3, затова е много важно тя също да бъде разглеждана внимателно и силно критикувана.
                        </li>
                        <li>
                            <IoIosTrendingDown/>
                            В България често медиите се изпозват за настройване на обществено мнение и като бухалки на прокуратурата. 
                            Много от по-възрастните хора вярват на всичко което прочетат, следователно лъжите влияят много силно на тяхното мнение, 
                            което се пренася и във възпитанието на децата.
                        </li>
                        <li>
                            <GiLightningShield/>
                            Затова е важно да бъдем критични към медиите, да се информираме от правилните места и да гледаме обективно на нещата.
                             MediaCritique е предназначен да помогне за това.
                        </li>
                    </ul>
                    <h3>Използвани технологии :</h3>
                    <ul>
                        <li>
                            <MdWeb/>
                            React, Sass, Yup
                        </li>
                        <li>
                            <AiOutlineDatabase/> Firebase
                        </li>
                        <li>
                            <FaGitSquare/> GitHub
                        </li>
                    </ul>
                    <h3>Разработчик :</h3>
                    <ul>
                        <li>
                            <FaUserAstronaut/>
                            Ивайло Чавдаров
                        </li>
                        <li>
                            <MdOutlineEmail/>
                            ivailochav@gmail.com
                        </li>
                    </ul>
                    <div className="contact-socials">
                        <Link to="https://www.linkedin.com/in/ivaylo-chavdarov-5ab76b294/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn/></Link>
                        <Link to="https://github.com/IvailoChavdarov" target="_blank" rel="noopener noreferrer"><FaGithubAlt/></Link>
                        <Link to="https://www.facebook.com/ivailo.chavdarov.90?locale=bg_BG" target="_blank" rel="noopener noreferrer"><FaFacebookF/></Link>
                        <Link to="https://discord.com/users/474134947461070848" target="_blank" rel="noopener noreferrer"><FaDiscord/></Link>
                    </div>
                </div>
            </div>
            
            <p className="footer-label">Ivaylo Chavdarov - MediaCritique - 2025</p>
        </footer>
        </>
    )
}
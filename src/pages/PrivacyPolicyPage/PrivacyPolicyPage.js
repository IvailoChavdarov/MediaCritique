import { useState } from "react"
import { Link } from "react-router-dom"
import './PrivacyPolicyPage.scss'

export default function PrivacyPolicyPage(){
    const [language, setLanguage] = useState("bg")

    return(
        <div className="privacy-policy-container">
            <div className="setLanguageButtons"><button disabled={language==="bg"} onClick={()=>setLanguage("bg")}>BG</button><button disabled={language==="en"} onClick={()=>setLanguage("en")}>EN</button></div>
            <h1>
                {
                language==="bg"?
                    "Политика за поверителност":
                    "Privacy Policy"
                }
            </h1>
            <h2>
                {
                language==="bg"?
                    "1. Въведение":
                    "1. Introduction"
                }
            </h2>
            <p>
                {
                language==="bg"?
                    "Тази Политика за поверителност обяснява как разширението за браузър и уебсайтът MediaCritique обработват вашата информация. Ние се ангажираме да бъдем прозрачни относно нашите практики.":
                    "This Privacy Policy explains how the MediaCritique browser extension and website handles your information. We are committed to protecting your privacy and being transparent about our practices."
                }
            </p>
            <h2>
                {
                language==="bg"?
                    "2. Данни които НЕ събираме":
                    "2. Data We Do NOT Collect"
                }
            </h2>
            <p>
                {
                language==="bg"?
                    "MediaCritique проектиран да зачита вашата поверителност. Той НЕ:":
                    "The Extension is designed to respect your privacy. It does NOT:"
                }
            </p>
            <ul>
                {
                language==="bg"?
                    <>
                        <li>Събира, запазва или предава каквато и да е лична информация.</li>
                        <li>Следи вашата браузър история или навици.</li>
                        <li>Използва проследяваща технология.</li>
                        <li>Изисква никаква регистрация.</li>
                    </>:
                    <>
                        <li>Collect, store, or transmit any personal information.</li>
                        <li>Track your browsing history or search habits.</li>
                        <li>Use cookies or any other tracking technologies.</li>
                        <li>Require any registration or login.</li>
                    </>
                }
            </ul>
            <h2>
                {
                language==="bg"?
                    "3. Данни, които достъпваме (За функционалност)":
                    "3. Data We Access (For Functionality)"
                }
            </h2>
            <p>
                {
                language==="bg"?
                    "Разширението работи, като чете URL адресите на уебсайтовете, които посещавате, и имената на публичните профили във Facebook. Тази информация се използва само локално на вашето устройство, за да се провери спрямо списък с медийни източници и публични личности. Тези URL адреси и данни за имена никога не се изпращат до нашите сървъри, нито се съхраняват никъде другаде.":
                    "The Extension works by reading the URLs of the websites you visit and the public profile names on Facebook. This information is used only locally on your device to check against a list of media sources and public figures. This URL and name data is never sent to our servers or stored anywhere."
                }
            </p>
            <h2>
                {
                language==="bg"?
                    "4. Услуги на трети страни (Firebase Firestore)":
                    "4. Third-Party Services (Firebase Firestore)"
                }
            </h2>
            <p>
                {
                language==="bg"?
                    "Разширението извлича своята база данни с медийни източници и публични личности от Firebase Firestore на Google. Това е публична база данни само за четене. Ние не изпращаме никакви потребителски данни до Firestore; то само извлича информация от нея. Вашето взаимодействие с Firestore е предмет на ":
                    "The Extension fetches its database of media sources and public figures from Google's Firebase Firestore. This is a public, read-only database. We do not send any user data to Firestore; it only pulls information from it. Your interaction with Firestore is subject to "
                }
                <Link to={"https://policies.google.com/privacy"} target="_blank">Google's Privacy Policy</Link>.
            </p>
            <h2>
                {
                language==="bg"?
                    "5. Контакти":
                    "5. Contact Us"
                }
            </h2>
            <p>
                {
                language==="bg"?
                    "Този проект се поддържа от студент-разработчик. Ако имате въпроси относно тази Политика за поверителност, можете да се свържете с нас на: mediacritique.dev@gmail.com":
                    "This project is maintained by a student developer. If you have any questions about this Privacy Policy, you can contact us at: mediacritique.dev@gmail.com"
                }
            </p>
        </div>
    )
}
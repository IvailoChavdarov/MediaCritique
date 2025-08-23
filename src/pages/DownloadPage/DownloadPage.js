import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoLogoChrome } from "react-icons/io5";
import { FaEdge, FaFirefoxBrowser } from "react-icons/fa";
import { FaBrave, FaOpera } from "react-icons/fa6";
import DownloadPlaceholder from "./images/placeholder.png"
import ExtensionLogo from "./images/extension-logo.svg"
import { SiPagespeedinsights } from "react-icons/si";
import { GiFeather } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import './DownloadPage.scss';
import { ReactSVG } from "react-svg";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function DownloadPage() {
    useDocumentTitle("Изтегли")

    const browserName = useRef(getBrowserNameLower());
    const [currentBrowser, setCurrentBrowser] = useState(browserName.current);
    const instructionsRef = useRef();
    const isFirstLoad = useRef(true);
    const browsers = ["chrome", "brave", "opera", "edge", "firefox"];

    useEffect(() => {
        if (instructionsRef.current) {
            const browserIndex = browsers.indexOf(currentBrowser);
            const scrollPosition = window.innerWidth * browserIndex;

            if (isFirstLoad.current) {
                instructionsRef.current.scrollLeft = scrollPosition;
                isFirstLoad.current = false; 
            } else {
                const start = instructionsRef.current.scrollLeft;
                const change = scrollPosition - start;
                const startTime = performance.now();
                const duration = 100; 

                const animateScroll = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    instructionsRef.current.scrollLeft = start + change * progress;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                };

                requestAnimationFrame(animateScroll);
            }
        }
        
    }, [currentBrowser]);

    return (
        <div className="download-page">
            <div className="download-heading">
                <div className="download-heading-text">
                    <h1>Добавете Media<span className="text-accent">Critique</span> към вашият браузър</h1>
                    <h2>Информирайте се правилно, знайте как се опитват да ви манипулират. Бъдете информирани, бъдете критични.</h2>
                    <h3>
                        <span className="easy-span"><FiUserCheck/>Удобен</span>
                        <span className="fast-span"><SiPagespeedinsights/>Бърз</span>
                        <span className="light-span"><GiFeather/>Лек</span>
                        <span className="useful-span"><MdOutlineHealthAndSafety/>Полезен</span>
                    </h3>
                </div>
                <div className="download-heading-logo">
                    <ReactSVG src={ExtensionLogo} width={300}/>
                </div>
            </div>
            <nav className="download-browsers-nav">
                <button 
                    className={`download-browsers-nav-link ${currentBrowser === "chrome" ? "active" : ""}`} 
                    onClick={() => setCurrentBrowser("chrome")}
                >
                    <IoLogoChrome/><span className="hide-on-mobile">Chrome</span>
                </button>
                <button 
                    className={`download-browsers-nav-link ${currentBrowser === "brave" ? "active" : ""}`} 
                    onClick={() => setCurrentBrowser("brave")}
                >
                    <FaBrave/><span className="hide-on-mobile">Brave</span>
                </button>
                <button 
                    className={`download-browsers-nav-link ${currentBrowser === "opera" ? "active" : ""}`} 
                    onClick={() => setCurrentBrowser("opera")}
                >
                    <FaOpera/><span className="hide-on-mobile">Opera</span>
                </button>
                <button 
                    className={`download-browsers-nav-link ${currentBrowser === "edge" ? "active" : ""}`} 
                    onClick={() => setCurrentBrowser("edge")}
                >
                    <FaEdge/><span className="hide-on-mobile">Edge</span>
                </button>
                <button 
                    className={`download-browsers-nav-link ${currentBrowser === "firefox" ? "active" : ""}`} 
                    onClick={() => setCurrentBrowser("firefox")}
                >
                    <FaFirefoxBrowser/><span className="hide-on-mobile">Firefox</span>
                </button>
            </nav>
            <div 
                id="download-instructions" 
                className="download-browsers-instructions" 
                ref={instructionsRef}
            >
                <div className={`download-instruction ${currentBrowser === "chrome" ? "active" : ""}`}>
                    <div className="instruction-content">
                        <div className="browser-specific-instruction">
                            <h4 className="browser-heading"><IoLogoChrome/>Chrome</h4>
                            <p className="browser-instruction">
                                Google Chrome е най-използваният браузър в света – милиони хора го избират заради скоростта, простотата и огромния избор от разширения.
                                Но в океана от информация, който минава през Chrome всеки ден, един въпрос става все по-важен:<br/><br/>
                                <i>Можем ли да се доверим на сайтовете, които четем?</i><br/><br/>
                                <b className="text-primary">MediaCritique е отговорът.</b>
                            </p>    
                            <Link className="call-to-action-button">Вземи от Chrome Web Store</Link>
                        </div>
                        <div className="download-store-banner">
                            <Link to="placeholder">
                                <img src={DownloadPlaceholder} alt="Chrome web store"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`download-instruction ${currentBrowser === "brave" ? "active" : ""}`}>
                    <div className="instruction-content">
                        <div className="browser-specific-instruction">
                            <h4 className="browser-heading"><FaBrave/>Brave</h4>
                            <p className="browser-instruction">
                                Ако вече избираш Brave, значи цениш свободата и контрола над собственото си онлайн преживяване.
                                MediaCritique ти дава още една стъпка към истинска прозрачност – като ти показва кой стои зад медиите, които четеш.
                                Също така в духа на Brave не пази никакви лични данни и не изисква регистрация.
                            </p>    
                            <Link className="call-to-action-button">Вземи от Chrome Web Store</Link>
                        </div>
                        <div className="download-store-banner">
                            <Link to="placeholder">
                                <img src={DownloadPlaceholder} alt="Chrome web store"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`download-instruction ${currentBrowser === "opera" ? "active" : ""}`}>
                    <div className="instruction-content">
                        <div className="browser-specific-instruction">
                            <h4 className="browser-heading"><FaOpera/>Opera</h4>
                            <p className="browser-instruction">
                                Opera винаги е била различният браузър. MediaCritique е различното разширение – то ти дава прозорец към истината за медиите.
                                Нещо ново, нещо различно – прозорец към прозрачността на интернет.
                                Интегрира се в стила на Opera – модерно, леко и полезно.
                            </p>
                            <Link className="call-to-action-button">Вземи от Opera Add-ons</Link>
                        </div>
                        <div className="download-store-banner">
                            <Link to="placeholder">
                                <img src={DownloadPlaceholder} alt="Opera Add-Ons"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`download-instruction ${currentBrowser === "edge" ? "active" : ""}`}>
                    <div className="instruction-content">
                        <div className="browser-specific-instruction">
                            <h4 className="browser-heading"><FaEdge/>Edge</h4>
                            <p className="browser-instruction">
                                Ако ползвате Edge, вероятно цените скоростта, сигурността и лесното използване. 
                                MediaCritique добавя още едно ниво – прозрачност за сайтовете, които посещавате.
                                Работи леко и бързо и се интергрира без допълнителни настройки или регистрации.
                            </p>    
                            <Link className="call-to-action-button">Вземи от Edge Add-ons Store</Link>
                        </div>
                        <div className="download-store-banner">
                            <Link to="placeholder">
                                <img src={DownloadPlaceholder} alt="Edge Add-Ons store"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`download-instruction ${currentBrowser === "firefox" ? "active" : ""}`}>
                    <div className="instruction-content">
                        <div className="browser-specific-instruction">
                            <h4 className="browser-heading"><FaFirefoxBrowser/>Firefox</h4>
                            <p className="browser-instruction">
                                Firefox е символ на свободния и независим интернет. 
                                MediaCritique споделя същата мисия – да е незвисима екип, 
                                които да даде безвъзмездно на хората повече знание за информацията, която намират в интернет.
                            </p>    
                            <Link className="call-to-action-button">Вземи от Firefox Add-ons Store</Link>
                        </div>
                        <div className="download-store-banner">
                            <Link to="placeholder">
                                <img src={DownloadPlaceholder} alt="Edge Add-Ons store"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function getBrowserNameLower() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("opr/") || userAgent.includes("opera")) return "opera"
    else if (userAgent.includes('firefox')) return "firefox";
    else if (userAgent.includes('edg')) return "edge";
    else if (navigator.brave) return "brave";
    else if (userAgent.includes("safari/") && !userAgent.includes("chrome/") && !userAgent.includes("chromium/")) return "safari";
    return "chrome";
}

import { Link } from "react-router-dom";
import './DownloadSection.scss'
import downloadBackground from './download-background.png'
export default function DownloadSection(){
    return(
        <div className="download-section">
            <img src={downloadBackground} className="download-section-background" alt="particles"/>
            <div className="download-section-content">
                <h3 className="download-section-title">Включете се безплатно</h3>
                <h4 className="download-section-subtitle">
                    Без никакво заплащане, не е нужна регистрация. Подобрете начина по който се информирате още днес.
                </h4>
                <div className="download-section-buttons">
                    <Link to='/download' className="call-to-action-button">Добавете MediaCritique към браузъра си</Link>
                    <Link to='/medias' className="btn-outline">Вижте информацията в нашият уеб сайт</Link>
                </div>
            </div>
        </div>
    )
}
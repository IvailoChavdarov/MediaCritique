import { Link } from "react-router-dom";
import {scrollToTop} from '../../../utils/scrollToTop'
import { ReactSVG } from "react-svg";
import './MediaImportanceShowcase.scss'
import TogetherSVG from './together.svg'
import { LiaMoneyBillSolid } from "react-icons/lia";
import { LiaSatelliteSolid } from "react-icons/lia";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LiaUserSecretSolid } from "react-icons/lia";
import { LiaSearchSolid } from "react-icons/lia";
import { FaFlag, FaInfoCircle  } from "react-icons/fa";

export default function MediaImportanceShowcase(){
    return(
        <>
        <div className="media-importance-section">
            <h2 className="media-importance-title">Какви са медиините заплахи и как им противодействаме?</h2>
            <div className="media-importance-grid">
                <div className="media-importance-grid-element">
                    <LiaMoneyBillSolid className="threat"/>
                    <h3>Платени медии</h3>
                    <p>
                        Голяма част от българските медии имат връзки с политици и се използват като инструмент за натиск.
                        Често се появяват и медии-бухалки, които разпространяват неистинна информация за конкретни личности,
                        с цел съсипване на репутация и демотивация на гражданите.
                    </p>
                </div>
                <div className="media-importance-grid-element">
                    <LiaSatelliteSolid className="threat"/>
                    <h3>Чуждестранна намеса</h3>
                    <p>
                        В интернет пространството се наблюдава значителна чуждестранна намеса както от изток, така и от запад. 
                        България е цел на информационни операции чрез трол фабрики, заглушаване на информация и други методи за влияние върху обществото.
                    </p>
                </div>
                <div className="media-importance-grid-element">
                    <LiaVoteYeaSolid className="threat"/>
                    <h3>Ниска активност</h3>
                    <p>
                        За да функционира демокрацията, обществото трябва да бъде активно и будно. В последните години обаче изборната активност
                        и гражданската ангажираност са ниски, като едно от основните препятствия са медиините манипулации и дезинформация.
                    </p>
                </div>
                <div className="media-importance-grid-element">
                    <LiaFileInvoiceDollarSolid className="solution"/>
                    <h3>Показваме финансиране</h3>
                    <p>
                        Ние информираме потребителите за финансирането на различни медии, за да могат да оценяват информацията критично и да имат предвид
                        потенциални интереси и зависимости.
                    </p>
                </div>
                <div className="media-importance-grid-element">
                    <LiaUserSecretSolid className="solution"/>
                    <h3>Разкриваме връзки</h3>
                    <p>
                        Ние разкриваме публичните и скритите връзки на медиите с политици в България и извън страната,
                        за да повишим прозрачността и информираността на обществото.
                    </p>
                </div>
                <div className="media-importance-grid-element">
                    <LiaSearchSolid className="solution"/>
                    <h3>Улесняваме намирането</h3>
                    <p>
                        Мотивираме хората да се информират, като помагаме при подбирането на надеждна информация сред морето от фалшиви новини.
                        Насърчаваме критично мислене към всяка медия и нейното съдържание.
                    </p>
                </div>
            </div>
        </div>
        <div className="showcase-block banner">
            <div className='showcase-half'>
                <ReactSVG src={TogetherSVG} className="together-image"/>
            </div>
            <div className='showcase-half'>
                <h3 className='showcase-heading'>Заедно, за едно по-добро бъдеще.</h3>
                <h4 className='showcase-subheading'>Бъдете информирани с MediaCritique и участвайте в създаването на едно по-добро бъдеще за нашето
                    общество. Докладвайте за проблеми и споделяйте.
                </h4>
                <div className="banner-buttons">
                    <Link to='/about' className='call-to-action-button' onClick={scrollToTop}><FaInfoCircle/>Вижте повече за нас</Link>
                    <Link to='/report' className='btn-outline' onClick={scrollToTop}><FaFlag/>Докладвайте за проблем</Link>
                </div>
            </div>
        </div>
        </>
    )
}
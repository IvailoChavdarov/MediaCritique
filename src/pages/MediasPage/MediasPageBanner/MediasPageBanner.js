import './MediasPageBanner.scss'
import heroSvg from './medias.svg'
import map from './bg.svg'
import { ReactSVG } from 'react-svg';
export default function MediasPageBanner(){
    return(
        <div className="medias-banner topnav-dark">
            <div className="medias-banner-titles">
                <h1>Медиите в България</h1>
                <p>В епоха на сензационализъм и пропаганда българските медии служат на властта, олигарсите и чуждите интереси. 
                    Корупцията и схемите проникват в редакциите, задавяйки независимата журналистика.
                     Фактите се изкривяват, важните теми замлъкват – а обществото остава в мрак.</p>
                <ul>
                    <li>Кой финансира медиите</li>
                    <li>Кой изопачава фактите</li>
                    <li className='answer'>Вижте кои имена стоят зад заглавията</li>
                </ul>
            </div>
            <div className="medias-banner-image">
                <ReactSVG className="bg-map" src={
                    map
                }/>
                <ReactSVG src={
                    heroSvg
                }/>
            </div>
        </div>
    )
}
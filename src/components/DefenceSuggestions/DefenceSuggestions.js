import './DefenceSuggestions.scss'
import { RiShieldCheckLine, RiShieldFlashLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import shieldImg from './shield.png'
import { scrollToTop } from "../../utils/scrollToTop";

export default function DefenceSuggestions(){
    return(
        <div className='defence-suggestions'>
            <h3 className='defence-heading'>Но... Как да се предпазим от медиините манипулации?</h3>
            <h4 className='defence-subheading'>Запомнете: Ако нещо ви се струва твърде "удобно" да вярвате или предизвиква автоматичен гняв/страх – спрете и проверете. 
                Истинската информация обикновено има нюанси.
            </h4>
            <div className='defence-suggestions-content'>
                <div className='defence-suggestions-list-container'>
                    <ul className='defence-suggestions-list'>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Проверявайте източника. </b>
                                Кой стои зад публикацията, реален човек ли е, 
                                каква е репутацията му, какво е финансирането му, 
                                какви мотиви може да има за публикацията?
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Търсете различни гледни точки. </b> 
                                Ако една медия твърди нещо "шокиращо", проверете как други издания го отразяват.
                                Избягвайте да се храните само от една информационна група (ютубъри, медиини групи, т.н.)
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Не се влияйте от внушения. </b> 
                                Често различни медии използват прекалени емоции, скандални заглавия, твърдения без доказателства, 
                                за да прекарат своите внушения в обществото и да го насочват за различни цели.
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Проверявайте факти и изображения. </b> 
                                Ако публикация или твърдение ви се струва съмнително, търсете допълнителна информация и използвайте 
                                различни 
                                <Link to='https://toolbox.google.com/factcheck/explorer/search/list:recent;hl=bg' target="_blank">инструменти за проверка</Link>, 
                                преди да си правите заключения.
                            </div>
                        </li>
                    </ul>
                    <Link to='/download' className='call-to-action-button' onClick={scrollToTop}><RiShieldFlashLine/>MediaCritique е тук за да ви помогне!</Link>
                </div>
                <div className='defence-suggestions-image'>
                    <img src={shieldImg} alt='shield' width={400}/>
                </div>
            </div>
        </div>
    )
}
import './CheckMediasSuggestions.scss'
import { RiShieldCheckLine, RiShieldFlashLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import checkingImg from './checking.svg'
import { ReactSVG } from 'react-svg';
import { scrollToTop } from "../../../utils/scrollToTop";

export default function CheckMediasSuggestions(){
    return(
        <div className='defence-suggestions'>
            <h3 className='defence-heading'>Но... Как да разпознаем манипулативните медии?</h3>
            <h4 className='defence-subheading'>
                Запомнете: Всяка медия е фирма, 
                тя си има финансиране и собственици. Съществуването на абсолютно обективна медия граничи с невъзможното, ние можем просто 
                да изберем тези, които дават най-истинна информация и използват най-малко методи за манипулация.
            </h4>
            <div className='defence-suggestions-content check-medias-content'>
                <div className='defence-suggestions-list-container'>
                    <ul className='defence-suggestions-list'>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Проверявайте финансирането на медията. </b>
                                Всяка медия трябва да се финансира. 
                                В зависимост от това финансиране можем да направим заключения за обективността на медията.
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Наблюдавайте заглавията и тона. </b> 
                                Предават ли само гняв срещу определени хора или групи? 
                                Правят ли внушения без доказателства. 
                                Заглавията внушават ли негативно отношение към конкретен човек.
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Дават ли фактически точни доказателства? </b> 
                                Кого цитират? Сайтове от другата страна дават ли същата информация? 
                                Проверявайте и в чуждестранни медии и използвайте 
                                <Link to='https://toolbox.google.com/factcheck/explorer/search/list:recent;hl=bg' target="_blank">инструменти за факт-чекинг</Link>.
                            </div>
                        </li>
                        <li>
                            <RiShieldCheckLine/>
                            <div>
                                <b>Не се доверявайте само на една медия. </b> 
                                Бъдете безпристрастни когато става дума за факти. 
                                Дори да не ни харесват всички факти, това е истината, ако не сме отворени към нея 
                                няма да можем да взимаме ползотворните действия, за да подобрим околността си.
                            </div>
                        </li>
                    </ul>
                    <Link to='/download' className='call-to-action-button' onClick={scrollToTop}><RiShieldFlashLine/>MediaCritique е тук за да ви помогне!</Link>
                </div>
                <div className='defence-suggestions-image'>
                    <ReactSVG src={
                        checkingImg
                    }/>
                </div>
            </div>
        </div>
    )
}
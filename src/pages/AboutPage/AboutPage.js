import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import devImage from './dev-icon.svg'
import './AboutPage.scss'
import { ReactSVG } from 'react-svg'
import { MdWavingHand } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { FaVoteYea } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";


export default function AboutPage(){
    useDocumentTitle("За нас")
    return(
        <div className='about-page'>
            <h2>Разработчик и администратор:</h2>
            <div className='member-info developer-info'>
                <div className='member-image developer-image'>
                    <ReactSVG src={devImage} width={300}/>
                </div>
                <div className='member-text developer-text'>
                    <h3>Ивайло Чавдаров</h3>
                    <p>
                        <MdWavingHand className='text-accent'/> Здравейте, аз съм Ивайло, <FaUniversity className='text-accent'/> 3 курс студент по Бизнес информатика и комуникации с преподване на английски език в УНСС.<br/>
                        <IoCodeSlashSharp className='text-accent'/> Създадох MediaCritique като страничен проект през лятото на 2025 година, тъй като имам интерес към политиката и журналистиката.<br/>
                        <HiSpeakerphone className='text-accent'/> Вярвам, че гражданската активност е най-важният елемент за подобрението на нашата родина, нашето бъдеще и бъдещето на децата ни.  <br/>
                        <FaVoteYea className='text-accent'/> Един от най-важните елементи за съставянето на по-силно гражданско общество е информираността, която за съжаление е заглушавана от 
                        тътените на дезинформацията. Всеки ден сме манипулирани от различни медии и от социалните мрежи за да вярваме в различни разрушителни 
                        убеждения. <br/>
                        <FaMicrophone className='text-accent'/> Затова най-важната стъпка която трябва да направим е да сме информирани и да подкрепяме обективната журналистика, тъй като тя
                        едновременно ни мотивира да градим новото бъдеще, както и ни подсказва какво пречи на нашето развитие. 
                    </p>
                </div>
            </div>
            <div className='about-editors'>
                <h2>Редактори:</h2>
                <div className='member-text'>
                    <p>
                        За момента няма други редактори.<br/>
                        При интерес може да се свържете с mediacritique.dev@gmail.com<br/>
                    </p>
                </div>
            </div>
        </div>
    )
}
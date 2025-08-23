import { Link } from 'react-router-dom'
import Logo from '../../../components/Logo/Logo'
import './ProjectIntroduction.scss'
import {scrollToTop} from '../../../utils/scrollToTop'

export default function ProjectIntroduction(){
    return(
        <div className='showcase-block project-introduction'>
            <div className='showcase-half'>
                <div className='logo-container'>
                    <Logo simple={true} width={500}/>
                </div>
            </div>
            <div className='showcase-half'>
                <h3 className='showcase-heading'>Какво е MediaCritique и за какво се бори?</h3>
                <p className='project-introduction-text'>
                    MediaCritique е независим проект, посветен на прозрачността и отговорността в медиите.
                    Той съчетава браузър разширение и уебсайт, за да даде на потребителите инструменти и знания в борбата срещу дезинформацията.
                    Чрез разширението получавате автоматични известия при посещение на медийни сайтове, за да знаете кой стои зад съдържанието и каква е неговата репутация.
                    На уебсайта ще откриете анализи, статии с мнения на екипа, разобличаване на често срещани лъжи и профили на различни медии – всичко, което ви е нужно, за да изградите по-критичен поглед към информационната среда.
                    <br/><br/>
                    Мисията ни е ясна: да подпомогнем за едно по-информирано и активно общество.
                    MediaCritique вярва, че това е основата за по-светло бъдеще за България.
                </p>
                <ul className='risk-meter-list'>
                    
                </ul>
                <Link to='/about' className='call-to-action-button' onClick={scrollToTop}>Вижте повече за нас</Link>
            </div>
        </div>
    )
}
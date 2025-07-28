import reportsSVG from './images/reports.svg'
import researchSVG from './images/research.svg'
import addSVG from './images/add.svg'
import finishSVG from './images/finish.svg'
import { ReactSVG } from 'react-svg';
import './ReportPageExplain.scss'

export default function ReportPageExplain(){
    return(
        <div className='page-explain report-page-explain'>
            <h2 className='page-explain-heading'>А как набавяме и добавяме информация?</h2>
            <h3 className='page-explain-subheading'>Ето защо вашите сигнали са важни за пълноценната работа на MediaCritique.</h3>
            <div className='explain-row'>
                <div className='explain-info'>
                    <h3>
                        1. Разглеждаме докладваните проблеми и сайтове
                    </h3>
                    <p>
                        Всеки сигнал е потенциален ключ към разкриването на медийна манипулация и разпространяване на истината. 
                        Ние разглеждаме прецизно постъпващите сигнали и други източници, 
                        за да идентифицираме най-тревожните случаи на дезинформация и манипулации и започваме да работим по разбирането му.
                    </p>
                </div>
                <div className='explain-image'>
                    <ReactSVG src={reportsSVG} className='mailbox'/>
                </div>
            </div>
            <div className='explain-row'>
                <div className='explain-image'>
                    <ReactSVG src={researchSVG} className='research'/>
                </div>
                <div className='explain-info'>
                    <h3>
                        2. Намираме информация по темата
                    </h3>
                    <p>
                        Проблемните теми минават към етап проучване. 
                        Разглеждаме източници, анализираме различни материали, търсим следи. 
                        Разплитаме мрежата от лъжи и манипулации. 
                        След това намерената информация се структурира и се избира дали да мине на следваща стъпка 
                        и как да се форматира.
                    </p>
                </div>
            </div>
            <div className='explain-row'>
                <div className='explain-info'>
                    <h3>
                        3. Информацията се добавя в системата
                    </h3>
                    <p>
                        Форматираната информация се преразглежда и при одобрение се добавя в нашата база данни чрез вътрешната система на MediaCritique. 
                        След опреснение се публикува на сайта и към нашето браузър разширение.
                    </p>
                </div>
                <div className='explain-image'>
                    <ReactSVG src={addSVG} className='add'/>
                </div>
            </div>
            <div className='explain-row'>
                <div className='explain-image'>
                    <ReactSVG src={finishSVG} className='finish'/>
                </div>
                <div className='explain-info'>
                    <h3>
                        4. И готово
                    </h3>
                    <p>
                        Информацията по темата вече се показва на нашите потребители. 
                        Хората използващи нашето разширение получават известие при срещата с проблемния сайт и ги информира за темата.
                    </p>
                </div>
            </div>
        </div>
    )
}
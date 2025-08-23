import './AdvantagesShowcase.scss'
import { useEffect, useState } from 'react';
import piggyBank from './images/piggy-bank-2.png'
import easyPuzzle from './images/easy-puzzle.webp'
import openDoor from './images/open-door.webp'
import animateOnScroll from '../../../utils/animateOnScroll';
export default function AdvantagesShowcase(){ 
    const [advantageOpenIndex, setAdvantageOpenIndex] = useState(0)
    const [currentAdvantageImage, setCurrentAdvantageImage] = useState(piggyBank)
    const setAdvantageIndex = (index) =>{
        setAdvantageOpenIndex(index)
        if(index === 0){
            setCurrentAdvantageImage(piggyBank)
        }
        else if(index === 1){
            setCurrentAdvantageImage(easyPuzzle)
        }
        else{
            setCurrentAdvantageImage(openDoor)
        }
    }

    useEffect(()=>{
        animateOnScroll(document.querySelector("#advantagesShowcase"))
    }, [])
    return(
        <div id="advantagesShowcase" className='showcase-block mobile-reverse advantages-block'>
            <div className='showcase-half'>
                <div className='advantage-image-container'>
                    <img src={currentAdvantageImage} alt='advantage-image' className='advantage-image'/>
                </div>
            </div>
            <div className='showcase-half'>
                <h3 className='showcase-heading'>Защо да изберете MediaCritique?</h3>
                <ul className='advantages-list'>
                    <li className={`advantage-container ${advantageOpenIndex===0? "active" : ""}`} onClick={()=>setAdvantageIndex(0)}>
                        <h4>Без нужда за плащане</h4>
                        <p className='advantage-text'>
                            <br/>
                            MediaCritique е изцяло безплатен за ползване. Нашата цел да информираме обществото е по-важна от мигновенно 
                            материално заплащане.
                        </p>
                    </li>
                    <li className={`advantage-container ${advantageOpenIndex===1? "active" : ""}`} onClick={()=>setAdvantageIndex(1)}>
                        <h4>Лесен за ползване</h4>
                        <p className='advantage-text'>
                            <br/>
                            Можете да се възползвате от цялата информация, въведена от екипа ни, без нужда от регистрация, попълване на данни или плащане.
                            Можете да изтеглите нашето разширение за браузър и бъдете информирани дори като си скролвате фейсбук или отворите новина,
                            която ви е предложена.
                        </p>
                    </li>
                    <li className={`advantage-container ${advantageOpenIndex===2? "active" : ""}`} onClick={()=>setAdvantageIndex(2)}>
                        <h4>Без нужда за регистрация</h4>
                        <p className='advantage-text'>
                            <br/>
                            MediaCritique не пази никаква ваша информация, може да добавите разширението без нужда от въвеждане на имена, пароли и така нататък.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
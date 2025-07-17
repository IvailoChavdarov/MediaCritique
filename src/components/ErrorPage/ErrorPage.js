import errorImage from './disconnected.png';
import { Link } from 'react-router-dom';
import './ErrorPage.scss'
export default function ErrorPage(){
    function refreshPage(){ 
        window.location.reload(); 
    }

    return(
        <div className='error-container'>
            <img src={errorImage} alt='disconnected cable'/>
            <h1>Опс, нещо се обърка.</h1>
            <h3>Пробвайте си късмета отново по-късно.</h3>
            <div className='error-buttons'>
                <button className='call-to-action-button' onClick={refreshPage}>Пробвай пак</button> 
                <Link className='call-to-action-button link-secondary' to="/">Начало</Link> 
            </div>
        </div>
    )
}
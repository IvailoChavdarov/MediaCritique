import { Link } from 'react-router-dom';
import diagram from './404-diagram.png'
import './NotFoundPage.scss'

export default function NotFoundPage({previousPage}){
    return(
        <div className='not-found-page'>
            <div className='not-found-text'>
                <h1>404</h1>
                <h2>Не е намерена такава страница</h2>
                <Link className='call-to-action-button' to={previousPage? previousPage : "/"}>Към <span>{previousPage? "предишната": "начална"}</span> страница</Link>
            </div>
            <img width="800" src={diagram} alt="We broke something or you can't type"/>
        </div>
    )
}
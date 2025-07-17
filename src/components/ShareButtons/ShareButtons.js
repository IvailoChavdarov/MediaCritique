import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './ShareButtons.scss';

export default function ShareButtons({title, catchText}){
        const currentUrl = window.location.href;
        const encodedUrl = encodeURIComponent(window.location.href);
        const copyUrl = () =>{
            navigator.clipboard.writeText(currentUrl)
        }
        return(
                <div className='article-share-buttons'>
                    <div className='share-message'>Споделете:</div>
                    <div className='share-links'>
                        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className='share-facebook'>
                            <FaFacebookF/>
                        </Link>
                        <Link to={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Мнението%20на%20MediaCritique:%20${title}&summary=${catchText}`} target="_blank" rel="noopener noreferrer" className='share-linkedin'>
                            <FaLinkedinIn/>
                        </Link>
                        <Link to={`mailto:?subject=Разгледайте%20това%20мнение&body=Днес%20прочетох%20това%20мнение%20${title}%20и%20ми%20направи%20впечатление:%20${currentUrl}`} className='share-email'>
                            <FaEnvelope/>
                        </Link>
                        <Link to={`https://twitter.com/intent/tweet?url=${currentUrl}&text=Разгледайте%20това%20мнение%20${title}!`} target="_blank" rel="noopener" className='share-x'>
                            <FaXTwitter/>
                        </Link>
                        <button onClick={copyUrl} className='share-copy'>
                            <FaCopy/>
                        </button>
                    </div>
                </div>
        )
}
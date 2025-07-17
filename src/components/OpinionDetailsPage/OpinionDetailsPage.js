import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { transliterateDate } from "../../utils/transliterate";
import './OpinionDetailsPage.scss'
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import Breadcrumb from '../Breadcrumb/Breadcrumb';

export default function OpinionDetailsPage(){

    const { compoundId } = useParams();

    const [opinionId] = compoundId.split('-');
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(window.location.href);
    const copyUrl = () =>{
        navigator.clipboard.writeText(currentUrl)
    }
    useEffect(() => {
        const fetchArticle = async () => {
        try {
            const docRef = doc(db, "opinions", opinionId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setArticle({ 
                    id: docSnap.id,
                    date: transliterateDate(data.datePosted.toDate().toDateString()),
                    ...data });
            } else {
                // TODO: 404 page
            }
            } catch (error) {
                // TODO: Error page
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [opinionId]);

    let breadcrumbPath = [];
    if (loading){
        return <div>Loading...</div>
    }
    else{
        breadcrumbPath = [{name:"Начало", url:"/"}, {name:"Мнения", url:"/opinions"}, {name:article.title}]
    };
    if (!article) return <div>Article not found</div>;



    return (
        <div className="article-details">
            <header className='article-header'>
                <div className='article-data'>
                    <span className='article-date'>{article.date}</span>
                    <span className='article-author'>{article.author}</span>
                </div>
                <div className='article-titles'>
                    <h1 className='article-title'>{article.title}</h1>
                    <h2 className='article-catch'>{article.catch}</h2>
                </div>
            </header>
            <img src={article.imageUrl} className='article-banner-image' alt='banner-image'/>
            <Breadcrumb path={breadcrumbPath}/>
            <div className='article-content-container'>
                <div className='article-share-buttons'>
                    <div className='share-message'>Споделете:</div>
                    <div className='share-links'>
                        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className='share-facebook'>
                            <FaFacebookF/>
                        </Link>
                        <Link to={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Мнението%20на%20MediaCritique:%20${article.title}&summary=${article.catch}`} target="_blank" rel="noopener noreferrer" className='share-linkedin'>
                            <FaLinkedinIn/>
                        </Link>
                        <Link to={`mailto:?subject=Разгледайте%20това%20мнение&body=Днес%20прочетох%20това%20мнение%20${article.title}%20и%20ми%20направи%20впечатление:%20${currentUrl}`} className='share-email'>
                            <FaEnvelope/>
                        </Link>
                        <Link to={`https://twitter.com/intent/tweet?url=${currentUrl}&text=Разгледайте%20това%20мнение%20${article.title}!`} target="_blank" rel="noopener" className='share-x'>
                            <FaXTwitter/>
                        </Link>
                        <button onClick={copyUrl} className='share-copy'>
                            <FaCopy/>
                        </button>
                    </div>
                </div>
                <div className='article-content' dangerouslySetInnerHTML={{ __html: article.content }} />
                {/* TODO add sources cards+links website page */}
            </div>

                {article.references !== undefined ?
                    <div className='reference-list-container'>
                        <h2>Допълнителни източници:</h2>
                        <ul>
                            {article.references.map((reference, i)=>(
                                <li key={i}>
                                    <TbInfoSquareRoundedFilled/><a href={reference.url} target='_blank' rel="noopener noreferrer">{reference.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div> : ""
                }

        </div>
    );
}
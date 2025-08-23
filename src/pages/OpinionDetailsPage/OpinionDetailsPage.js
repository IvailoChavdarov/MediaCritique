import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { transliterateDate } from "../../utils/transliterate";
import '../../styles/shared/detailsPage.scss'
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import Loader from '../../components/Loader/Loader';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function OpinionDetailsPage(){

    const { compoundId } = useParams();
    const [opinionId] = compoundId.split('-');
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

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
                    ...data }
                );
                
            } 
        } 
        catch (error) {
            setHasError(true)
        } 
        finally {
            setLoading(false);
        }
        };
        fetchArticle();
    }, [opinionId]);

    useDocumentTitle(article && article.title)
    
    let breadcrumbPath = [];
    if (loading){
        return <Loader/>
    }
    else if(hasError){
        return <ErrorPage/>
    }
    else if (!article){
        return <NotFoundPage previousPage={"/opinions"}/>
    }
    else{
        breadcrumbPath = [{name:"Начало", url:"/"}, {name:"Мнения", url:"/opinions"}, {name:article.title}]
    };

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
                <ShareButtons title={article.title} catchText={article.catch}/>
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
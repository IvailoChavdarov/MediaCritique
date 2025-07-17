import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './MediaDetailsPage.scss'
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function MediaDetailsPage(){

    const { compoundId } = useParams();

    const [mediaId] = compoundId.split('-');
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
        try {
            const docRef = doc(db, "medias", mediaId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setMedia({ 
                    id: docSnap.id,
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
    }, [mediaId]);

    let breadcrumbPath = [];
    if (loading){
        return <div>Loading...</div>
    }
    if (!media){
        return <NotFoundPage previousPage={"/medias"}/>
    }
    else{
        breadcrumbPath = [{name:"Начало", url:"/"}, {name:"Медии", url:"/medias"}, {name:media.name}]
    };



    return (
        <div className='media-details-container'>
            <Breadcrumb path={breadcrumbPath}/>
            <div className='media-details'>
                <div className='media-details-data'>
                    <img src={media.imgUrl} alt={media.name + " logo"}></img>
                    <h1>{media.name}</h1>
                    <p>Линк: <Link to={media.url} target='_blank'> {media.url}</Link></p>
                    <div className='media-risk'>
                        <ol className='media-risk-scale'>
                            <li className={media.riskLevel === 0? "active": ""}>0</li>
                            <li className={media.riskLevel === 1? "active": ""}>1</li>
                            <li className={media.riskLevel === 2? "active": ""}>2</li>
                            <li className={media.riskLevel === 3? "active": ""}>3</li>
                            <li className={media.riskLevel === 4? "active": ""}>4</li>
                        </ol>
                        <ol className='media-risk-explain'>
                            <li>
                                Обозначения:
                                <hr/>
                            </li>
                            <li>0 – Няма особени съмнения за медия</li>
                            <li>1 – Малки съмнения за обективност</li>
                            <li>2 – Засилени съмнения за обективност</li>
                            <li>3 – Насочва обществено мнение. Бухалка на политици/мафиоти.</li>
                            <li>4 – Оръжие за чуждестранно влияние </li>
                        </ol>
                    </div>
                </div>
                <div className='media-details-content' dangerouslySetInnerHTML={{ __html: media.content }} />
            </div>
            {media.references !== undefined ?
                    <div className='reference-list-container'>
                        <h2>Допълнителни източници:</h2>
                        <ul>
                            {media.references.map((reference, i)=>(
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
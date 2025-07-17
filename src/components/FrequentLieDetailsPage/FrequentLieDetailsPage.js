import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './FrequentLieDetailsPage.scss'
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import ShareButtons from '../ShareButtons/ShareButtons';

export default function FrequentLieDetailsPage(){

    const { compoundId } = useParams();
    const [lieId] = compoundId.split('-');
    const [lieDetails, setLieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLie = async () => {
        try {
            const docRef = doc(db, "lies", lieId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setLieDetails({ 
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
        fetchLie();
    }, [lieId]);

    let breadcrumbPath = [];
    if (loading){
        return <div>Loading...</div>
    }
    else{
        breadcrumbPath = [{name:"Начало", url:"/"}, {name:"Често срещани лъжи", url:"/lies"}, {name:lieDetails.title}]
    };
    if (!lieDetails) return <div>Data for lie not found</div>;



    return (
        <div className="article-details">
            <header className='article-header'>
                <div className='article-data'>
                    <span className='article-author'>{lieDetails.author}</span>
                </div>
                <div className='article-titles'>
                    <h1 className='article-title'>{lieDetails.title}</h1>
                    <h2 className='article-catch'>{lieDetails.catch}</h2>
                </div>
            </header>
            <img src={lieDetails.imageUrl} className='article-banner-image' alt='banner-image'/>
            <Breadcrumb path={breadcrumbPath}/>
            <div className='article-content-container'>
                <ShareButtons title={lieDetails.title} catchText={lieDetails.catch}/>
                <div className='article-content' dangerouslySetInnerHTML={{ __html: lieDetails.content }} />
                {/* TODO add sources cards+links website page */}
            </div>

                {lieDetails.references !== undefined ?
                    <div className='reference-list-container'>
                        <h2>Допълнителни източници:</h2>
                        <ul>
                            {lieDetails.references.map((reference, i)=>(
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
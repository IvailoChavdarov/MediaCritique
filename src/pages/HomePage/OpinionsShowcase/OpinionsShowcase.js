import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { transliterate, transliterateDate } from '../../../utils/transliterate';
import './OpinionsShowcase.scss'
import { db } from '../../../firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../../utils/slugify';
import { scrollToTop } from '../../../utils/scrollToTop';

export default function OpinionsShowcase(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const firstPageQuery = query(
                    collection(db, "opinions"),
                    where("isDeleted", "!=", true),
                    orderBy("isDeleted"),
                    orderBy("datePosted", "desc"),
                    limit(3)
                );
                const documentSnapshots = await getDocs(firstPageQuery);
                
                const articles = documentSnapshots.docs.map(doc => ({
                    id: doc.id,
                    date: transliterateDate(doc.data().datePosted.toDate().toDateString()),
                    ...doc.data()
                }));
                
                setData(articles);
            } 
            catch (err) {
                setHasError(true)
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [])

    return(
        <div className='opinions-showcase-section background-accent'>
            <div className='opinions-showcase-heading'>
                <h3 className='opinions-showcase-title'>
                    Повече за нас
                </h3>
                <h4 className='opinions-showcase-subtitle'>
                    Разгледайте нашите мнения по различни актуални теми.
                </h4>
                <Link onClick={scrollToTop} to='/opinions' className='call-to-action-button'>Вижте всички</Link>
            </div>
            <div className='opinions-showcase-deck'>
                {!isLoading && (!hasError && 
                    data.map((opinion, index)=>(
                        <Link key={index} to={`/opinions/${opinion.id}-${slugify(transliterate(opinion.title))}`} className='opinion-showcase-card' onClick={scrollToTop}>
                            <img src={opinion.imageUrl} alt='opinion-image'/>
                            <div className='opinion-showcase-card-content'>
                                <h4 className='opinion-showcase-card-title'>{opinion.title}</h4>
                                <p className='opinion-showcase-card-text'>{opinion.catch}</p>
                                <div className='opinion-showcase-card-footer'>
                                    <p className='opinion-showcase-card-author'>{opinion.author}</p>
                                    <p className='opinion-showcase-card-date'>{opinion.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
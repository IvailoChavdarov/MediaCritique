import { db } from "../../firebase";
import { collection, getDocs, limit, query, startAfter } from 'firebase/firestore';
import { useEffect, useState } from "react";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import SuggestionCarusel from "../SuggestionCarusel/SuggestionCarusel";
import './FrequentLiesPage.scss'
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import FrequentLiesBanner from "../FrequentLiesBanner/FrequentLiesBanner";
import LiesCategories from "../LiesCategories/LiesCategories";
import DefenceSuggestions from "../DefenceSuggestions/DefenceSuggestions";

export default function FrequentLiesPage(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 6;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const firstPageQuery = query(collection(db, "lies"), limit(pageSize));
                const documentSnapshots = await getDocs(firstPageQuery);
                
                const articles = documentSnapshots.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setData(articles);
                setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
                setHasMore(documentSnapshots.docs.length === pageSize);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const loadMoreArticles = async () => {
        setIsLoading(true);
        try {
            const nextPageQuery = query(
                collection(db, "lies"),
                startAfter(lastVisible),
                limit(pageSize)
            );
            const documentSnapshots = await getDocs(nextPageQuery);
            
            const newArticles = documentSnapshots.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setData(prev => [...prev, ...newArticles]);
            setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
            setHasMore(documentSnapshots.docs.length === pageSize);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (error) return <ErrorPage/>;

    if(isLoading) return <Loader/>

    return(
        <>
            <FrequentLiesBanner/>
            <div className="opinions-container">
                {(isLoading || (isLoading && data.length === 0)) ?
                <Loader />
                :
                <>
                    <ArticlesGrid articles={data} category={"lies"}/>
                    {hasMore && (
                        <div className="load-more-container">
                            <button 
                                onClick={loadMoreArticles} 
                                disabled={isLoading}
                                className="call-to-action-button load-more-button"
                            >
                                {isLoading ? 'Зареждане' : 'Зареди още'}
                            </button>
                        </div>
                    )}
                </>
                }

            </div>
            <DefenceSuggestions/>
            <div className="suggestion-section">
                <h3>За да се информирате, препоръчваме да следите:</h3>
                <SuggestionCarusel/>
            </div>
            <LiesCategories/>
        </>
    )
}
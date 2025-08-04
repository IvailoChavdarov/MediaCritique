import { db } from "../../firebase";
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { transliterateDate } from "../../utils/transliterate";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import './OpinionsPage.scss'
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import OpinionsPageExplain from "../OpinionsPageExplain/OpinionsPageExplain";


export default function OpinionsPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 6;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const firstPageQuery = query(collection(db, "opinions"), where("isDeleted", "!=", true), limit(pageSize));
                const documentSnapshots = await getDocs(firstPageQuery);
                
                const articles = documentSnapshots.docs.map(doc => ({
                    id: doc.id,
                    date: transliterateDate(doc.data().datePosted.toDate().toDateString()),
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
                collection(db, "opinions"),
                where("isDeleted", "!=", true),
                startAfter(lastVisible),
                limit(pageSize)
            );
            const documentSnapshots = await getDocs(nextPageQuery);
            
            const newArticles = documentSnapshots.docs.map(doc => ({
                id: doc.id,
                date: transliterateDate(doc.data().datePosted.toDate().toDateString()),
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

    if (error) return <ErrorPage />;
    
    return (
        <>
            <div className="opinions-container">
                <h1>Вижте нашето мнение за:</h1>
                {(isLoading || (isLoading && data.length === 0)) ?
                <Loader />
                : 
                <>
                    <ArticlesGrid articles={data} category={"opinions"} />
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
            <OpinionsPageExplain />
        </>
    );
}
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import SuggestionCarusel from "../SuggestionCarusel/SuggestionCarusel";
import './FrequentLiesPage.scss'
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import FrequentLiesBanner from "../FrequentLiesBanner/FrequentLiesBanner";

export default function FrequentLiesPage(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "lies"));
                const articles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(articles);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching articles:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (error) return <ErrorPage/>;

    if(isLoading) return <Loader/>

    return(
        <>
            <FrequentLiesBanner/>
            <div className="opinions-container">
                <ArticlesGrid articles={data} category={"lies"}/>
            </div>  
            <div className="suggestion-section">
                <h3>За да се информирате, препоръчваме да следите:</h3>
                <SuggestionCarusel/>
            </div>
        </>
    )
}
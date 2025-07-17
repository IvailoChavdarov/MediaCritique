import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import SuggestionCarusel from "../SuggestionCarusel/SuggestionCarusel";
import './FrequentLiesPage.scss'

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

    //TODO: add error page
    if (error) return <div>{error}</div>;


    return(
        <>
        <div className="opinions-container">
            <h1>Често срещани лъжи</h1>
            <h2>Лъжите, които чуваме всеки ден и съзнателно или несъзнателно ни влияят.</h2>
            {isLoading? <span>Loading...</span> : <ArticlesGrid articles={data} category={"lies"}/>}
        </div>  
        <div className="suggestion-section">
            <h3>За да се информирате, препоръчваме да следите:</h3>
            <SuggestionCarusel/>
        </div>
        </>
    )
}
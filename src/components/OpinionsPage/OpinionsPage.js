import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { transliterateDate } from "../../utils/transliterate";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import './OpinionsPage.scss'

export default function OpinionsPage(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "opinions"));
                const articles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    date: transliterateDate(doc.data().datePosted.toDate().toDateString()),
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
      <div className="opinions-container">
        <h1>Вижте нашето мнение за:</h1>
        {isLoading? <span>Loading...</span> : <ArticlesGrid articles={data}/>}
      </div>  
    )
}
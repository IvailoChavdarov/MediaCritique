import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { transliterateDate } from "../../utils/transliterate";
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid'
import './OpinionsPage.scss'
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import OpinionsPageExplain from "../OpinionsPageExplain/OpinionsPageExplain";

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
            } 
            catch (err) {
                setError(err);
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) return <ErrorPage/>;
    
    if (isLoading) return <Loader/>;

    return(
        <>
        <div className="opinions-container">
            <h1>Вижте нашето мнение за:</h1>
            {isLoading? <span>Loading...</span> : <ArticlesGrid articles={data} category={"opinions"}/>}
        </div>
        <OpinionsPageExplain/>
        </>
    )
}
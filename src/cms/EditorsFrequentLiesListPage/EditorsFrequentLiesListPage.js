import { db } from "../../firebase";
import { collection, doc, getDocs, limit, query, setDoc, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import '../../styles/shared/editorPage.scss'
import { IoIosAddCircleOutline } from "react-icons/io";

export default function EditorFrequentLiesListPage(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [requestState, setRequestState] = useState();
    const pageSize = 20;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const firstPageQuery = query(collection(db, "lies"), where("isDeleted", "!=", true), limit(pageSize));
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
                where("isDeleted", "!=", true),
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
            console.log(err.message)
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    const deleteFrequentLie = async (id) =>{
        setIsLoading(true)
        await setDoc(doc(db, "lies", id), { isDeleted: true }, { merge: true })
        .then(()=>{
            setData(prevLie => 
                prevLie.map(opinion => 
                    opinion.id === id ? { ...opinion,  isDeleted: true} : opinion
                )
            );
            setRequestState({
                state: "success",
                message: "Лъжата бе изтрита успешно!",
                id: Date.now(),
            });
        })
        .catch(()=>{ 
            setRequestState({
                id: Date.now(),
                state: "failure",
                message: "Лъжата не бе изтрита успешно!"
            });
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    if (error) return <ErrorPage />;

    return(
        <>
        {(isLoading || (isLoading && data.length === 0)) ?
            <Loader />
            : 
            <>
            <div className="cms-page">
                <h1 className="cms-page-heading">Въведена информация за често срещани лъжи:</h1>
                <Link to='/cms/add/frequent-lies' className="cms-add-link"><IoIosAddCircleOutline/>Добави лъжа</Link>
                <table className="cms-list-table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Заглавие</td>
                            <td>
                                Действия
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((article, index)=>(
                        <tr key={index}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            {/* <td>{article.author}</td>
                            <td>{article.date}</td> */}
                            <td className="actions-cell">
                                <Link to={`/lies/${article.id}`} target="_blank" className="button-info">Виж</Link>
                                <Link to={`/cms/edit/frequent-lies/${article.id}`} className="button-edit">Редактирай</Link>
                                <button onClick={()=>deleteFrequentLie(article.id)} className="button-delete">Изтрий</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
            </div>
            {requestState && (
                <ToastNotification
                    key={requestState.id}
                    state={requestState.state}
                    text={requestState.message}
                />
            )}
            </>
            }
        </>
    )
}
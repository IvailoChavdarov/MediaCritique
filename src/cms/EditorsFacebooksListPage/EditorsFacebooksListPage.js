import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, limit, query, setDoc, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import '../../styles/shared/editorPage.scss'
import { IoIosAddCircleOutline } from "react-icons/io";

export default function EditorsFacebooksListPage(){
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
                const firstPageQuery = query(collection(db, "facebooks"), limit(pageSize));
                const documentSnapshots = await getDocs(firstPageQuery);
                
                const articles = documentSnapshots.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setData(articles);
                setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
                setHasMore(documentSnapshots.docs.length === pageSize);
            } catch (err) {
                console.log(err.message)
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const loadMoreAccounts = async () => {
        setIsLoading(true);
        try {
            const nextPageQuery = query(
                collection(db, "facebooks"),
                startAfter(lastVisible),
                limit(pageSize)
            );
            const documentSnapshots = await getDocs(nextPageQuery);
            
            const newAccounts = documentSnapshots.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setData(prev => [...prev, ...newAccounts]);
            setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
            setHasMore(documentSnapshots.docs.length === pageSize);
        } catch (err) {
            console.log(err.message)
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    const deleteProfileInfo = async (id) =>{
        setIsLoading(true)
        await deleteDoc(doc(db, "facebooks", id))
        .then(()=>{
            setData(prevProfiles => 
                prevProfiles.filter(x=>x.id!==id)
            );
            setRequestState({
                state: "success",
                message: "Информацията за Фейсбук акаунт бе изтрито успешно!",
                id: Date.now(),
            });
        })
        .catch(()=>{ 
            setRequestState({
                id: Date.now(),
                state: "failure",
                message: "Информацията за Фейсбук акаунт не бе изтрито успешно!"
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
                <h1 className="cms-page-heading">Въведени акаунти:</h1>
                <Link to='/cms/add/facebooks' className="cms-add-link"><IoIosAddCircleOutline/>Добави акаунт</Link>
                <table className="cms-list-table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Име</td>
                            <td>Ниво опасност</td>
                            <td>
                                Действия
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((profile, index)=>(
                        <tr key={index}>
                            <td>{profile.id}</td>
                            <td>{profile.name}</td>
                            <td>{profile.riskLevel}</td>
                            <td className="actions-cell">
                                <Link to={`https://www.facebook.com${profile.matchUrl}`} target="_blank" className="button-info">Виж акаунт</Link>
                                <Link to={`/cms/edit/facebooks/${profile.id}`} className="button-edit">Редактирай</Link>
                                <button onClick={()=>deleteProfileInfo(profile.id)} className="button-delete">Изтрий</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {hasMore && (
                    <div className="load-more-container">
                        <button 
                            onClick={loadMoreAccounts} 
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
import { db } from "../../firebase";
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import '../../styles/shared/editorPage.scss'
import { IoIosAddCircleOutline } from "react-icons/io";

export default function EditorsMediasListPage(){
    const [data, setData] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    //follow first load for loader component
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [hasError, setHasError] = useState(false);
    const pageSize = 20; 
    const loadMedias = async (initial = false) => {
        setLoading(true);
        try {
            const baseQuery = query(
                collection(db, "medias"),
                ...(lastDoc ? [startAfter(lastDoc)] : []),
                limit(pageSize)
            );

            const snapshot = await getDocs(baseQuery);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            if (initial) {
                setData(items);
                setIsLoadingInitial(false)
            } 
            else {
                setData(prev => [...prev, ...items]);
            }

            if (snapshot.docs.length < pageSize) {
                setHasMore(false);
            } 
            else {
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            }
        } 
        catch (err) {
            setHasError(true)
        }
        finally{
            setLoading(false);
        }

    };

    useEffect(() => {
        loadMedias(true);
    }, []);

    if (hasError) return <ErrorPage/>;

    if (isLoadingInitial) return <Loader/>;

    return(
        <div className="cms-page">
            <h1 className="cms-page-heading">Въведена информация за медии:</h1>
            <Link to='/cms/add/medias' className="cms-add-link"><IoIosAddCircleOutline/>Добави медия</Link>
            <table className="cms-list-table">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Име</td>
                        <td>Риск</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                {data.map((media) => (
                    <tr key={media.id}>
                        <td>
                            {media.id}
                        </td>
                        <td>
                            {media.name}
                        </td>
                        <td>
                            {media.riskLevel}
                        </td>
                        <td className="actions-cell">
                            <Link to={`/medias/${media.id}`} target="_blank" className="button-info">Инфо</Link>
                            <Link to={media.url} target="_blank" className="button-link">Сайт</Link>
                            <Link to={`/cms/edit/medias/${media.id}`} className="button-edit">Редактирай</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {hasMore && (
                <div className="load-more-container">
                    <button onClick={() => loadMedias()} disabled={loading} className="call-to-action-button load-more-button">
                        {loading ? "Зареждане..." : "Зареди още"}
                    </button>
                </div>
            )}
        </div>
    )
}
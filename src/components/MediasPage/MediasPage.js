import { db } from "../../firebase";
import { collection, query, getDocs, where, limit, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { slugify } from "../../utils/slugify";
import { transliterate } from "../../utils/transliterate";
import { IoIosArrowForward } from "react-icons/io";
import './MediasPage.scss';
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";

export default function MediasPage() {
    const [data, setData] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    //follow first load for loader component
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [hasError, setHasError] = useState(false);
    const pageSize = 15; 
    const loadMedias = async (initial = false) => {
        setLoading(true);
        try {
            const baseQuery = query(
                collection(db, "medias"),
                where("parentMedia", "==", null),
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

    return (
        <div className="medias-list-container">
            <h1>Въведена информация за медии:</h1>
            <ul className="medias-list">
                {data.map((media) => (
                    <li key={media.id}>
                        <Link to={`/medias/${media.id}-${slugify(transliterate(media.name))}`} className="medias-list-item">
                            {media.imgUrl &&
                                <div className="medias-list-item-image">
                                    <img src={media.imgUrl} alt="media logo" />
                                </div>
                            }
                            <div className="medias-list-item-info">
                                <h3>{media.name}</h3>
                                <p>{media.note}</p>
                            </div>
                            <span className="call-to-action-text">Прочетете повече <IoIosArrowForward /></span>
                        </Link>
                    </li>
                ))}
            </ul>

            {hasMore && (
                <div className="load-more-container">
                    <button onClick={() => loadMedias()} disabled={loading} className="load-more-button">
                        {loading ? "Зареждане..." : "Зареди още"}
                    </button>
                </div>
            )}
        </div>
    );
}
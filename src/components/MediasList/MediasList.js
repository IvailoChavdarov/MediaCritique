import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MediasList(){
     const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "medias"));
            setData(querySnapshot.docs.map(doc => doc.data()));
        };
        fetchData();
    }, []);

    return(
        <>
            <h1>Медии</h1>
            <ul>
                {data.map((item, i) => (
                    <li key={i}>{item.name}</li>
                ))}
            </ul>
        </>
    )
}
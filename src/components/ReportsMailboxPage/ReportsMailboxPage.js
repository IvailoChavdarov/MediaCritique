import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, query, where, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import MessageList from "../MessageList/MessageList";

export default function ReportsMailboxPage(){
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        async function getMessages(){
            try{
                await getDocs(query(
                    collection(db, "reports"),
                    where("isDeleted", "!=", true) 
                ))
                .then((querySnapshot)=>{
                    const messagesData = querySnapshot.docs.map(doc=>({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMessages(messagesData)
                });
            }
            catch(err){
                console.log(err)
                setHasError(true)
            }
            finally{
                setIsLoading(false)
            }
        }
        getMessages()
    }, [])

    const readMessage = async (id) => {
        await setDoc(doc(db, "reports", id), { isRead: true }, { merge: true }).then(()=>{
            setMessages(prevMessages => 
                prevMessages.map(message => 
                    message.id === id ? { ...message,  isRead: true} : message
                )
            );
        })
    }

    const deleteMessage = async (id) => {
        await setDoc(doc(db, "reports", id), { isDeleted: true }, { merge: true })
        .then(()=>{
            setMessages(
                prevMessages => prevMessages.filter(message => message.id !== id)
            );
        })
    }

    if (isLoading) return <Loader/>

    if (hasError) return <ErrorPage/>

    return(
        <MessageList title={"Докладвания"} messages={messages} readMessage={readMessage} deleteMessage={deleteMessage}/>
    )
}
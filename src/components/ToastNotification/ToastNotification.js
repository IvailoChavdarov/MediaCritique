import { useEffect, useState } from "react"
import './ToastNotification.scss'
import { MdOutlineDangerous } from "react-icons/md";
import { FaCheck, FaInfo } from "react-icons/fa";
export default function ToastNotification({state, text}){
    const [isShown, setIsShown] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    useEffect(() => {
        setIsShown(true);
        setIsClosing(false);

        const timer = setTimeout(() => {
        handleClose();
        }, 8000);

        return () => clearTimeout(timer);
    }, [state, text]);
    const handleClose = () =>{
        setIsClosing(true)
        setTimeout(()=>{
            setIsShown(false)
        }, 600)
    }
    if (!isShown) return null;

    return (
        <div
        className={`toast-notification ${state} ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
        >
        {state === "success" ? <FaCheck /> : state === "failure" ? <MdOutlineDangerous /> : <FaInfo />}
        <p>{text}</p>
        </div>
    );
}
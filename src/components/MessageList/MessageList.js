import { useState } from "react"
import { MdPhoneInTalk } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import './MessageList.scss'
import { ReactSVG } from "react-svg";
import selectSvg from './select.svg';

export default function MessageList({messages, title, readMessage, deleteMessage}){
    const [currentMessage, setCurrentMessage] = useState(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
    const setMessageToRead = (message, index) => {
        setCurrentMessage(message);
        setCurrentMessageIndex(index);
        if(!message.isRead){
            readMessage(message.id)
        };
    }

    const removeMessage = (id) => {
        setCurrentMessage(null)
        setCurrentMessageIndex(null)
        deleteMessage(id)
    }
    return(
        <div className="mailbox-container">
            <div className="mailbox-nav">
                <h3>{title}:</h3>
                <ul>
                    {messages.map((message, index)=>(
                        <li className={`${index===currentMessageIndex? "active" : ""} ${message.isRead? "read" : ""}`} key={index} onClick={()=>setMessageToRead(message, index)}>
                            {message.subject && <span>{message.subject} - </span>}
                            {message.email}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="message-content">
                {currentMessage? 
                    <>
                    <h4 className="message-title">
                        {currentMessage.subject && <span>{currentMessage.subject} - </span>}
                        {currentMessage.email}
                        <button className="delete-message-button" onClick={()=> removeMessage(currentMessage.id)}><IoTrashOutline/></button>
                    </h4>
                    <div className="message-content">
                        <p>{currentMessage.message}{currentMessage.description}</p>
                        <p className="message-references">{currentMessage.referenceUrl && <span>Препракта към проблема: <Link to={currentMessage.referenceUrl} target="_blank">{currentMessage.referenceUrl}</Link></span>}</p>
                        <div className="message-contacts">
                            <p>{currentMessage.names && <span><IoMdPerson/> {currentMessage.names}</span>}</p>
                            <p>{currentMessage.phone && <span><MdPhoneInTalk/> {currentMessage.phone}</span>}</p>
                        </div>
                    </div>
                    </>
                    :
                    <>
                    <h4 className="message-title">Изберете съобщение</h4>
                    <div className="message-content">
                        <ReactSVG src={selectSvg} className="select-default-svg"/>
                    </div>
                    </>
                }
            </div>
        </div>
    )
}
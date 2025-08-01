import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import { RxDotsVertical } from "react-icons/rx";
import ToastNotification from "../ToastNotification/ToastNotification";
import { BsMicMute } from "react-icons/bs";
import { TfiCrown } from "react-icons/tfi";
import './EditorsList.scss'

export default function EditorsList(){
    const [editors, setEditors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [requestState, setRequestState] = useState();

    useEffect(()=>{
        setIsLoading(true)
        const fetchEditorsData = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, "editors"));
                const editorsData = querySnapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }))
                setEditors(editorsData)
            }
            catch{
                setHasError(true)
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchEditorsData(); 
    }, [])

    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId(id);
    };

    const closeDropdown = () => setOpenDropdownId(null);

    const toggleDisableEditor = async (isDisabled) => {
        await setDoc(doc(db, "editors", openDropdownId), { isDisabled: !isDisabled }, { merge: true })
        .then(()=>{
            setEditors(prevUsers => 
                prevUsers.map(user => 
                    user.id === openDropdownId ? { ...user,  isDisabled: !isDisabled} : user
                )
            );
            setRequestState({
                state: "success",
                message: "Акаунтът бе актуализиран успешно!",
                id: Date.now(),
            });
        })
        .catch(()=>{ 
            setRequestState({
                id: Date.now(),
                state: "failure",
                message: "Акаунтът не бе актуализиран успешно!"
            });
        })
        .finally(()=>{
            closeDropdown();
        })
    }

    const resetEditorPassword = async (email) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setRequestState({
                state: "success",
                message: "Изпратен е имейл за промяна на парола!",
                id: Date.now(),
            });
        })
        .catch(()=>{
            setRequestState({
                state: "failure",
                message: "Проблем в изпращането на имейл за промяна на парола!",
                id: Date.now(),
            });
        })
        .finally(()=>{
            closeDropdown();
        })
    }

    if(isLoading) return <Loader/>

    if(hasError) return <ErrorPage/>

    return(
        <>
        <h2>Регистрирани редактори:</h2>
        <table className="editors-table">
            <thead>
                <tr>
                    <td>
                        Име
                    </td>
                    <td>
                        Email
                    </td>
                    <td>
                        Дата на добавяне
                    </td>
                    <td>

                    </td>
                </tr>
            </thead>
            <tbody>
                {editors.map((profile, index) => (
                    <tr key={index}>
                        <td>
                            {profile.isDisabled && 
                                <span className="disabled-indicator">
                                    <BsMicMute/>
                                </span>
                            }
                            {profile.isAdministrator && 
                                <span className="admin-indicator">
                                    <TfiCrown/>
                                </span>
                            }
                            {profile.name}
                        </td>
                        <td>
                            {profile.email}
                        </td>
                        <td>
                            {profile.createdAt.toDate().getDate()}
                            /
                            {profile.createdAt.toDate().getMonth()}
                            /
                            {profile.createdAt.toDate().getYear()+1900}
                        </td>
                        <td>
                            <button
                                onClick={() => toggleDropdown(profile.id)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-expanded={openDropdownId === profile.id}
                                aria-haspopup="true"
                                aria-label="Actions"
                            >
                                <RxDotsVertical />
                            </button>
                            {openDropdownId === profile.id && (
                                <>
                                <div className="backdrop" onClick={closeDropdown} aria-hidden="true"/>
                                <div className="actions-dropdown" role="menu">
                                    {!profile.isAdministrator&& 
                                        <button
                                            onClick={() => toggleDisableEditor(profile.isDisabled)}
                                            role="menuitem"
                                        >
                                            {profile.isDisabled ? 'Активирай' : 'Деактивирай'}
                                        </button>
                                    }
                                    <button
                                        onClick={() => resetEditorPassword(profile.email)}
                                        role="menuitem"
                                    >
                                        Смени парола
                                    </button>
                                    <p>
                                        {profile.name}
                                    </p>
                                </div>
                                </>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {requestState && (
                <ToastNotification
                  key={requestState.id}
                  state={requestState.state}
                  text={requestState.message}
                />
        )}
        </>
    )
}
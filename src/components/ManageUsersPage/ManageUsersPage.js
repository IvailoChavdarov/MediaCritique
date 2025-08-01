import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut as signOutPrimary} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp, deleteApp, getApps } from "firebase/app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../../firebase";
import { firebaseConfig } from "../../firebaseConfig";
import ToastNotification from "../ToastNotification/ToastNotification";
import Loader from "../Loader/Loader";
import EditorsList from "../EditorsList/EditorsList";
import './ManageUsersPage.scss'
import { IoIosAddCircleOutline } from "react-icons/io";

const createAccountSchema = yup.object({
  name: yup.string().required("Темата е задължителна."),
  password: yup.string()
  .required('Паролата е задължителна')
  .min(8, 'Паролата трябва да е поне 8 символа')
  .max(32, 'Паролата трябва да е под 32 символа')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:+-=])(?=.{8,})/,
    'Паролата трябва да има поне една главна буква, една малка, една цифра и един специален символ'
  ),
  email: yup.string().email("Невалиден имейл.").required("Имейлът е задължителен"),
});

export default function ManageUsersPage() {
  const [requestState, setRequestState] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(createAccountSchema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // checks if secondary auth instance exists
      const secondaryApp =
        getApps().find(app => app.name === "Secondary") ||
        initializeApp(firebaseConfig, "Secondary");

      const secondaryAuth = getAuth(secondaryApp);

      // creating account on secondary auth instance to prevent auto log in
      const { user: newUser } = await createUserWithEmailAndPassword(
        secondaryAuth,
        data.email,
        data.password
      );

      // add other user info
      await setDoc(doc(db, "editors", newUser.uid), {
        name: data.name,
        email: data.email,
        createdAt: serverTimestamp()
      });

      await secondaryAuth.signOut();

      // clean up secondary instance
      await deleteApp(secondaryApp);

      setRequestState({
        state: "success",
        message: "Акаунтът бе създаден успешно!",
        id: Date.now(),
      });

      reset()
    }
    catch (err) {
      setRequestState({
        id: Date.now(),
        state: "failure",
        message: "Акаунтът не бе създаден успешно!"
      });
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading && <Loader/>}
      <div className={`manage-editors-container ${isLoading?" hidden" : ""}`}>
        <div className={`register-form-modal ${!registerModalIsOpen?" hidden" : ""}`}>
          <div className="register-modal-backdrop" onClick={()=>setRegisterModalIsOpen(false)}></div>
          <div className="register-form-container">
            <h2>Добави редактор:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email<span className="required-indicator">*</span></label>
                    <input type="email" {...register("email")} />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Имена <span className="required-indicator">*</span></label>
                    <input {...register("name")} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div>
                    <label>Парола<span className="required-indicator">*</span></label>
                    <input {...register("password")} type="password"/>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <button className="call-to-action-button" disabled={isLoading} type="submit">
                    Създай
                </button>
            </form>
          </div>
        </div>
        <div className="editors-list-container">
          <button onClick={()=>setRegisterModalIsOpen(true)} className="call-to-action-button"><IoIosAddCircleOutline/> Добави</button>
          <EditorsList/>
        </div>
      </div>
      {requestState && (
        <ToastNotification
          key={requestState.id}
          state={requestState.state}
          text={requestState.message}
        />
      )}
    </>
  );
}

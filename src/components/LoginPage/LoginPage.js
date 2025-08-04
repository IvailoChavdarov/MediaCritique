import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from '../Loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.scss'
import Logo from '../Logo/Logo';

const loginSchema = yup.object({
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

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(loginSchema),
  });
  const [loginError, setLoginError] = useState("")
  const onSubmit = async (data) => {
      setIsLoading(true)
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(()=>{
          return <Navigate to="/dashboard" replace />;
        });
      } catch (e) {
        if(e.message.includes('invalid-credential')){
          setLoginError("Грешен имейл/парола")
        }
        else{
          setLoginError("Грешка в сървъра")
        }
      }
      finally{
        setIsLoading(false)
      }
  }

  if(loading) return <Loader/>

  if(user) return <Navigate to='/dashboard' replace/>

  return (
    <>
    {isLoading && <Loader/>}
    <div className={`login-page ${isLoading?" hidden" : ""}`}>
      <div className='login-form-container'>
        <Logo simple={true} width={150}/>
        <h2>Влезте в CMS системата</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="error">{loginError}</p>
            <div>
                <label>Email<span className="required-indicator">*</span></label>
                <input type="email" {...register("email")} />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
                <label>Парола<span className="required-indicator">*</span></label>
                <input {...register("password")} type="password"/>
                {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <button className="login-button" disabled={isLoading} type="submit">
                Влезни
            </button>
        </form>
      </div>
    </div>
    </>
  );
}
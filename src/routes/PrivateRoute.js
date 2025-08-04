import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export function PrivateRoute() {
const { user, loading: authLoading } = useAuth();
  const [editorCheck, setEditorCheck] = useState({
    loading: true,
    isDisabled: false
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setEditorCheck({ loading: false, isDisabled: false });
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const docSnap = await getDoc(doc(db, "editors", user.uid));
        const isDisabled = docSnap.exists() && docSnap.data().isDisabled === true;
        setEditorCheck({ loading: false, isDisabled });
      } catch (error) {
        console.error("Editor check failed:", error);
        setEditorCheck({ loading: false, isDisabled: true });
      }
    };

    checkAdminStatus();
  }, [user, authLoading]);

  if (authLoading || (user && editorCheck.loading)) {
    return <Loader />;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (editorCheck.isDisabled) return <ErrorPage/>;
  
  return <Outlet/>
}

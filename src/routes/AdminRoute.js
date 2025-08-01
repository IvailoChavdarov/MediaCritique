import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader/Loader";

export default function AdminRoute() {
  const { user, loading: authLoading } = useAuth();
  const [adminCheck, setAdminCheck] = useState({
    loading: true,
    isAdmin: false
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setAdminCheck({ loading: false, isAdmin: false });
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const docSnap = await getDoc(doc(db, "editors", user.uid));
        const isAdmin = docSnap.exists() && docSnap.data().isAdministrator === true;
        setAdminCheck({ loading: false, isAdmin });
      } catch (error) {
        console.error("Admin check failed:", error);
        setAdminCheck({ loading: false, isAdmin: false });
      }
    };

    checkAdminStatus();
  }, [user, authLoading]);

  if (authLoading || (user && adminCheck.loading)) {
    return <Loader />;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!adminCheck.isAdmin) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
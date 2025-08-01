import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader/>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

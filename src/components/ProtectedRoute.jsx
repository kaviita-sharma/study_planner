import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CircleLoader from "./common/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <CircleLoader />;
  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

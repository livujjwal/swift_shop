import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ childern }) => {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return childern;
};

export default ProtectedRoutes;

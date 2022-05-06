import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/Login";
import ResetPassword from "./views/ResetPassword";
import ForgotPassword from "./views/ForgotPassword";
import AuthContainer from "./components/AuthContainer";

function Auth(){
  return (
    <AuthContainer>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </AuthContainer>
  );
};

export default Auth;

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/Login";
import ResetPassword from "./views/ResetPassword";
import ForgotPassword from "./views/ForgotPassword";
import Container from "./components/Container";

const Auth = () => {
  return (
    <Container>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </Container>
  );
};

export default Auth;

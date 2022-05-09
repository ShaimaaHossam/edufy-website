import { Routes, Route, Navigate } from "react-router-dom";

import ResetPassword from "./views/ResetPassword";
import ForgotPassword from "./views/ForgotPassword";
import AuthContainer from "./components/AuthContainer";
import EmailLogin from "./views/EmailLogin";
import MobileLogin from "./views/MobileLogin";

function Auth() {
  return (
    <AuthContainer>
      <Routes>
        <Route index element={<Navigate to="email-login" />} />
        <Route path="email-login" element={<EmailLogin />} />
        <Route path="mobile-login" element={<MobileLogin />} />
        <Route path="forget-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="email-login" />} />
      </Routes>
    </AuthContainer>
  );
}

export default Auth;

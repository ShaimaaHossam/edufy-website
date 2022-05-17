import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, rememberMe, clearState } from "../../redux/userSlice";

import Theme from "./components/Theme";
import AppContainer from "./components/AppContainer";
import Auth from "../Auth";

const Greeting = ({ text }) => {
  const { t } = useTranslation();

  return (
    <Typography component="h1" variant="h3" align="center" color="primary">
      {t(text)}
    </Typography>
  );
};

function App() {
  const dispatch = useDispatch();

  const [isLoggedIn, seIsLoggedIn] = useState(
    window.sessionStorage.getItem("isLoggedIn") ||
      window.localStorage.getItem("isLoggedIn")
  );
  const { userData, isSuccess, isError } = useSelector(userSelector);

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      seIsLoggedIn(true);
    } else if (window.localStorage.getItem("token")) {
      seIsLoggedIn(true);
    }
  }, [userData]);

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) {
      dispatch(rememberMe(token));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      seIsLoggedIn(true);
      dispatch(clearState());
    }

    if (isError) {
      seIsLoggedIn(false);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  return (
    <Theme>
      <Router>
        {isLoggedIn ? (
          <AppContainer>
            <Routes>
              {/* LIST APP ROUTES HERE */}
              <Route index path="/" element={<Greeting />}></Route>
            </Routes>
          </AppContainer>
        ) : (
          <Routes>
            {/* LIST PUBLIC ROUTES HERE */}
            <Route index path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </Router>
    </Theme>
  );
}

export default App;

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
import { userSelector, rememberMe } from "../../redux/userSlice";

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
  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const { userData } = useSelector(userSelector);

  useEffect(() => {
    if (userData !== "") {
      seIsLoggedIn(true);
    } else if (window.localStorage.getItem("token")) {
      seIsLoggedIn(true);
    }
  }, [userData]);
  return (
    <Theme>
      <Router>
        {isLoggedIn ? (
          <AppContainer>
            <Routes>
              {/* LIST APP ROUTES HERE */}
              <Route index path="/" element={<Greeting text="greeting" />} />
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

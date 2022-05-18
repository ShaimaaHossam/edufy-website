import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { userSelector, rememberMe } from "../../redux/userSlice";

import Theme from "./components/Theme";
import AppContainer from "./components/AppContainer";
import Spinner from "./components/Spinner";
import Auth from "../Auth";

function App() {
  const dispatch = useDispatch();
  const { userData, token } = useSelector(userSelector);

  useEffect(() => {
    if (token && !userData) {
      dispatch(rememberMe(token));
    }
  }, [token, userData]);

  if (token && !userData) return <Spinner />;

  return (
    <Theme>
      <Router>
        {token && userData ? (
          <AppContainer>
            <Routes>
              {/* LIST APP ROUTES HERE */}
              <Route index path="/auth/*" element={<Navigate to="/" />} />
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

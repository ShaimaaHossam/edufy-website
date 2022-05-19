import { useEffect, lazy, Suspense } from "react";

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

const Auth = lazy(() => import("../Auth"));
const Profiles = lazy(() => import("../Profiles"));

const Dashboard = lazy(() => import("../Dashboard"));
const Properties = lazy(() => import("../Properties"));
const People = lazy(() => import("../People"));
const Orders = lazy(() => import("../Orders"));
const Accounting = lazy(() => import("../Accounting"));
const Communication = lazy(() => import("../Communication"));
const Services = lazy(() => import("../Services"));
const Help = lazy(() => import("../Help"));

function App() {
  const dispatch = useDispatch();
  const { userData, token } = useSelector(userSelector);

  useEffect(() => {
    if (token && !userData) {
      dispatch(rememberMe(token));
    }
  }, [token, userData, dispatch]);

  if (token && !userData) return <Spinner />;

  return (
    <Theme>
      <Router>
        <Suspense fallback={<></>}>
          {token && userData ? (
            <AppContainer>
              <Suspense fallback={<></>}>
                <Routes>
                  {/* LIST APP ROUTES HERE */}
                  <Route path="profiles/*" element={<Profiles />} />

                  <Route path="dashboard/*" element={<Dashboard />} />
                  <Route path="properties/*" element={<Properties />} />
                  <Route path="people/*" element={<People />} />
                  <Route path="orders/*" element={<Orders />} />
                  <Route path="accounting/*" element={<Accounting />} />
                  <Route path="communication/*" element={<Communication />} />
                  <Route path="services/*" element={<Services />} />
                  <Route path="help/*" element={<Help />} />

                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Suspense>
            </AppContainer>
          ) : (
            <Routes>
              {/* LIST PUBLIC ROUTES HERE */}
              <Route index path="/auth/*" element={<Auth />} />

              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          )}
        </Suspense>
      </Router>
    </Theme>
  );
}

export default App;

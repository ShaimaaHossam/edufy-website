import { useEffect, lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authSelector, rememberMe } from "../../redux/slices/auth";
import NotFound from "../../shared/views/NotFound";
import Theme from "./components/Theme";
import AppContainer from "./components/AppContainer";
import ErrorBoundary from "./components/ErrorBoundary";

import Loader from "../../shared/components/Loader";

const Auth = lazy(() => import("../Auth"));
const Profiles = lazy(() => import("../Profiles"));

const Dashboard = lazy(() => import("../Dashboard"));
const Properties = lazy(() => import("../Properties"));
const People = lazy(() => import("../People"));
const Orders = lazy(() => import("../Orders"));
const Accounting = lazy(() => import("../Accounting"));
const Communication = lazy(() => import("../Communication"));
const Services = lazy(() => import("../Services"));
const Settings = lazy(() => import("../Settings"));
const Help = lazy(() => import("../Help"));

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(authSelector);

  useEffect(() => {
    if (token && !user) {
      dispatch(rememberMe(token));
    }
  }, [token, user, dispatch]);

  if (token && !user) return <Loader />;

  return (
    <Router>
      <Theme>
        <Suspense fallback={<Loader />}>
          {token && user ? (
            <AppContainer>
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
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
                    <Route path="settings/*" element={<Settings />} />
                    <Route path="help/*" element={<Help />} />

                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route
                      path="/auth/*"
                      element={<Navigate to="/dashboard" />}
                    />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </AppContainer>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* LIST PUBLIC ROUTES HERE */}
                  <Route index path="/auth/*" element={<Auth />} />

                  <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </Suspense>
      </Theme>
    </Router>
  );
}

export default App;

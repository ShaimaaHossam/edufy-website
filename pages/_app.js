import Layout from "../components/layout";
import "../styles/globals.css";
import { useState } from 'react'
import { StudentProvider } from '../contexts/StudentContext'
import MeetingLayout from "../components/meetingLayout";
function MyApp({ Component, pageProps, ...appProps }) {
  const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(0);
  const logUser = (user) => {
    setUser(user);
    setLoggedIn(1);
  }
  if ([`/join-meeting`, `/meeting`].includes(appProps.router.pathname)) {
    return (
      <StudentProvider>
        <MeetingLayout>
          <Component loggedIn={loggedIn} logUser={logUser} user={user} {...pageProps} />
        </MeetingLayout>
      </StudentProvider>
    )
  }

  if ([`/dashboard`, `/login`, `/sign-up`].includes(appProps.router.pathname))
    return <Component loggedIn={loggedIn} logUser={logUser} user={user}  {...pageProps} />;
  return (
    <StudentProvider>
      <Layout>
        <Component loggedIn={loggedIn} logUser={logUser} user={user} {...pageProps} />
      </Layout>
    </StudentProvider>
  );
}

export default MyApp;

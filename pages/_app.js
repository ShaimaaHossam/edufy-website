import Layout from "../components/layout";
import "../styles/globals.css";
import {useState} from 'react'

function MyApp({ Component, pageProps, ...appProps }) {
  const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(0);
  const logUser = (user) =>{
    setUser(user);
    setLoggedIn(1);
  }
  
  if ([`/dashboard`, `/login`, `/sign-up`].includes(appProps.router.pathname))
    return <Component loggedIn={loggedIn} logUser={logUser} user={user}  {...pageProps} />;
  return (
    <Layout>
      <Component loggedIn={loggedIn} logUser={logUser} user={user} {...pageProps} />
    </Layout>
  );
}

export default MyApp;

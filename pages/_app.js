import Layout from "../components/layout";
import "../styles/globals.css";
import App from 'next/app';
import { StudentProvider } from "../contexts/StudentContext";
import MeetingLayout from "../components/meetingLayout";

const MyApp = ({ Component, pageProps, ...appProps }) => {
  
  function logUser(user){
    localStorage.setItem('user', user)
  }
  if ([`/join-meeting`, `/meeting`].includes(appProps.router.pathname)) {
    return (
      <StudentProvider>
        <MeetingLayout>
          <Component
            {...pageProps}
          />
        </MeetingLayout>
      </StudentProvider>
    );
  }

  if ([`/dashboard`, `/login`, `/sign-up`].includes(appProps.router.pathname))
    return (
      
        <StudentProvider>
        <Component 
        logUser={logUser}
        {...pageProps}/>
        </StudentProvider>
     
    );
  return (
    
      <StudentProvider>
        <Layout>
          <Component logUser={logUser} {...pageProps}/>
        </Layout>
      </StudentProvider>
   
  );
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
export default App;

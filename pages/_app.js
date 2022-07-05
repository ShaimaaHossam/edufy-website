import Layout from "../components/layout";
import "../styles/globals.css";
import { useState, useMemo } from "react";
import { StudentProvider } from "../contexts/StudentContext";
import MeetingLayout from "../components/meetingLayout";
function MyApp({ Component, pageProps, ...appProps }) {
  
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

export default MyApp;

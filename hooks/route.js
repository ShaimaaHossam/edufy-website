import React from 'react'
import { auth } from '../firebase/firebase-config'
import { useRouter } from 'next/router'

export  function withPublic(Component) {
  return function withPublic(props){
    const router = useRouter()
    if(auth.currentUser != null){
        router.replace("/");
        return <h1>Loading...</h1>;
    }

    return <Component {...props} />;
  }
}
export  function withProtected() {
    return 
}
  
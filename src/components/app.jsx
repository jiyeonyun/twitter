import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../myBase';

function App() {
  const[init,setInit] = useState(false);
  const[userObj,setUserObj] = useState(null);
  useEffect(()=>{
  authService.onAuthStateChanged((user)=> {
    if(user){
      setUserObj(user);
    }
    setInit(true);
  });
  },[]);
  
  return (  
    <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initialized..." }
    </>
  );
}

export default App;

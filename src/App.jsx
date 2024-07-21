import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { getUser } from './services/authTokenService';

//Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import SignUp from './components/Forms/SignUp';
import SignIn from './components/Forms/SignIn';
import Error from './components/Error';

export const AuthUserContext = createContext(null);

const App = () => {
  //State
  const [user, setUser] = useState(getUser());

  return (

    <>
    <AuthUserContext.Provider value={{user, setUser}}>
      <Navbar />
      <Routes>
        
        {user ?
        <Route path="/" element={<Dashboard />} />
              :
        <Route path="/" element={<Landing />} />
        }

        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Error />} />

      </Routes>
      </AuthUserContext.Provider>
    </>

  )
}

export default App;

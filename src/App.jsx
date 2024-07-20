import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";

//Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import SignUp from './components/Forms/SignUp';
import SignIn from './components/Forms/SignIn';

export const AuthUserContext = createContext(null);

const App = () => {
  //State
  const [user, setUser] = useState(null);

  return (

    <>
    <AuthUserContext.Provider value={{user}}>
      <Navbar />
      <Routes>
        
        {user ?
        <Route path="/" element={<Dashboard />} />
              :
        <Route path="/" element={<Landing />} />
        }

        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

      </Routes>
      </AuthUserContext.Provider>
    </>

  )
}

export default App;

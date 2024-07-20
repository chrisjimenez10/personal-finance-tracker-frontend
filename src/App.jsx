import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";

//Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

const App = () => {
  //State
  const [user, setUser] = useState(null);

  return (

    <>
      <Routes>
        <Navbar />
        {user ?
        <Route path="/" element={<Dashboard />} />
              :
        <Route path="/" element={<Landing />} />
        }

      </Routes>
    </>

  )
}

export default App;

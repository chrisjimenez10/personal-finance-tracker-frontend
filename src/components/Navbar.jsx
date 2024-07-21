import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthUserContext } from '../App';
import { signOut } from '../services/authTokenService';

const Navbar = () => {

    const { user, setUser } = useContext(AuthUserContext);

    //Sign Out Handler Function
    const handleSignOut = () => {
        signOut();
        setUser(null);
    };

  return (

    <>
        {user ?
        <>
            <Link to="/">Dashboard</Link>
            <Link to="" onClick={handleSignOut}>Sign-Out</Link>
        </> 
              :
        <>
            <Link to="/">Landing</Link>
            <Link to="signup">Sign-Up</Link>
            <Link to="signin">Sign-In</Link>
        </>
            
        }
    </>

  )
}

export default Navbar;
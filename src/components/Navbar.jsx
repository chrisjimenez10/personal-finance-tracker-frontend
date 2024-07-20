import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthUserContext } from '../App';

const Navbar = () => {

    const {user} = useContext(AuthUserContext);

  return (

    <>
        {user ?
        <>
            <Link to="/">Dashboard</Link>
            <Link to="/sign-out">Sign-Out</Link>
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
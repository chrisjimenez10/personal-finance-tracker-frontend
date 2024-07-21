import React, { useContext } from 'react';
import { AuthUserContext } from '../App';



const Dashboard = () => {

  const { user } = useContext(AuthUserContext);

  return (

    <>
      <h1>Welcome, {user.user_name}</h1>
      <p>
        This is the Dashboard for Authenticated Users only.
      </p>
    </>

  )
}

export default Dashboard;
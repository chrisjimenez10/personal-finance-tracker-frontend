import React, { useContext } from 'react';
import { AuthUserContext } from '../App';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {

  const { user } = useContext(AuthUserContext);
  const navigate = useNavigate();

  return (

    <>
      <h1>Welcome, {user.user_name}</h1>
      <p>
        This is the Dashboard for Authenticated Users only.
      </p>
      <button onClick={()=> navigate("/transactions")}>Transactions</button>
    </>

  )
}

export default Dashboard;
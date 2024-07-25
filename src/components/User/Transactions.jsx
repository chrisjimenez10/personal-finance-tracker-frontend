import React, { useState, useEffect, useContext } from 'react';
import { fetchUserTransactions } from '../../services/totalBalanceService';
import { AuthUserContext } from '../../App';


const Transactions = () => {

    const { user } = useContext(AuthUserContext);

    //State
    const [transactions, setTransactions] = useState([]);
    const [userId, setUserId] = useState(null);
    const [latestTransaction, setLatestTransaction] = useState(null);

    //Functions
    const fetchUserTransactionsDB = async () => {
        try{
            const userData = await fetchUserTransactions(user.id);
            setLatestTransaction(userData[userData.length - 1].total_balance);
            setUserId(userData[0].user_id);
            setTransactions(userData);
        }catch(error){
            console.error(error.message);
        }
    };

    useEffect(()=>{
        fetchUserTransactionsDB();
    },[]);


  return (

    <>
        <h1>{user.user_name}</h1>
        <dt>User ID: {userId}</dt>

        <h2>Current Total Balance: ${latestTransaction}</h2>
        <ul>
            {transactions.map((transaction)=>{
                return (           
                    <li key={transaction.id}>
                        <dt>Transaction ID: {transaction.id}</dt>
                        <dd>Total Balance: ${transaction.total_balance}</dd>
                        <dd>Date: {transaction.date_transaction.split("T")[0]}</dd>
                        <dd>Incoming: ${transaction.income_transaction}</dd>
                        <dd>Outgoing: ${transaction.expense_transaction}</dd>
                    </li>
                )
            })}
        </ul>

        <button>Incoming</button>
        <button>Outgoing</button>

    </>

  )
}

export default Transactions;
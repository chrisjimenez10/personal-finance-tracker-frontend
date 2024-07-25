import React, { useState, useEffect, useContext } from 'react';
import { fetchUserTransactions } from '../../services/totalBalanceService';
import { AuthUserContext } from '../../App';


const Transactions = () => {

    const { user } = useContext(AuthUserContext);

    //State
    const [transactions, setTransactions] = useState([]);

    //Functions
    const fetchUserTransactionsDB = async () => {
        try{
            const userData = await fetchUserTransactions(user.id);
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
        <ul>
            {transactions.map((transaction)=>{
                return (
                    <li key={transaction.id}>
                        <dt>Transaction ID: {transaction.id}</dt>
                        <dd>Total Balance: ${transaction.total_balance}</dd>
                        <dd>Date: {transaction.date_transaction}</dd>
                        <dd>Incoming: ${transaction.income_transaction}</dd>
                        <dd>Outgoing: ${transaction.expense_transaction}</dd>
                    </li>
                )
            })}
        </ul>

        <button>View User ID</button>
    </>

  )
}

export default Transactions;
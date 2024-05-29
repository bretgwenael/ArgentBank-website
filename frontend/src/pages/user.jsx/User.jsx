import React, { useEffect } from 'react';
import Account from "../../components/Account/Account"
import { useSelector } from 'react-redux';
import "./user.scss"

function User() {

    const data = useSelector((state) => state.user);
    console.log(data);

    useEffect(() => {

    },[]) 

    return (
        <main className="main bg-dark">
            <div className='welcome'>
                <h1>Welcome back<br /></h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account 
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            amountDescription="Available Balance"
            />
            <Account 
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            amountDescription="Available Balance"
            />
            <Account 
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            amountDescription="Current Balance"
            />
        </main>
    )
}

export default User;
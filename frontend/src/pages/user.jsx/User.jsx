import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Account from "../../components/Account/Account";
import { getProfile } from '../../store/authSlice';
import EditProfileForm from '../../components/EditProfileForm/EditProfilForm'; // Assurez-vous que le chemin est correct
import "./user.scss";

function User() {
  const dispatch = useDispatch();
  const { error, user, token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log('Token in User component:', token);
    if (token) {
      dispatch(getProfile(token));
    }
  }, [token, dispatch]);

  return (
    <main className="main bg-dark">
      <div className='welcome'>
        {error && <p>{error}</p>}
        {!isEditing && user && (
          <>
            <h1>Welcome back<br />{user.firstName} {user.lastName}</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        )}
        {isEditing && user && (
          <EditProfileForm 
            user={user}
            onCancel={() => setIsEditing(false)}
          />
        )}
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
  );
}

export default User;
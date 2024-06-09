import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../store/authSlice';
import './editprofilform.scss';

function EditProfileForm({ user, onCancel }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    userName: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        userName: user.userName || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formValues))
      .then(() => {
        onCancel(); // Close the form on success
      })
      .catch((error) => {
        console.error('Failed to update profile:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='edit-container'>
            <div className='edit-wrapper'>
                <h1>Edit user info</h1>
                <label htmlFor="userName">User name :</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formValues.userName}
                    onChange={handleChange}
                />
            </div>
            <div className='edit-wrapper'>
                <label htmlFor="firstName">First Name :</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    disabled
                />
            </div>
            <div className='edit-wrapper'>
                <label htmlFor="lastName">Last Name :</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    disabled
                />
            </div>
            <div>
                <button className="edit-profile-button" type="submit">Save</button>
                <button className="edit-profile-button" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../store/authSlice';
import './editprofilform.scss';

function EditProfileForm({ user, onCancel }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ // État local pour les valeurs du formulaire
    userName: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    // Effet secondaire pour mettre à jour les valeurs du formulaire lorsque user change
    if (user) {
      setFormValues({
        userName: user.userName || '', // Utilisation de user.userName ou une chaîne vide par défaut
        firstName: user.firstName || '', // Utilisation de user.firstName ou une chaîne vide par défaut
        lastName: user.lastName || '' // Utilisation de user.lastName ou une chaîne vide par défaut
      });
    }
  }, [user]); // Déclenche l'effet lorsque user change

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuration de l'événement pour obtenir name et value
    setFormValues({
      ...formValues,
      [name]: value // Met à jour la propriété correspondante dans formValues
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formValues)) // Dispatch de l'action updateProfile avec les valeurs du formulaire
      .then(() => {
        onCancel(); // Appel de la fonction onCancel pour annuler la modification du profil
      })
      .catch((error) => {
        console.error('Failed to update profile:', error); // Gestion des erreurs en cas d'échec de la mise à jour du profil
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
            onChange={handleChange} // Appel à handleChange pour mettre à jour userName
          />
        </div>
        <div className='edit-wrapper'>
          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange} // Appel à handleChange pour mettre à jour firstName
            disabled // Désactivation de l'édition du champ firstName
          />
        </div>
        <div className='edit-wrapper'>
          <label htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange} // Appel à handleChange pour mettre à jour lastName
            disabled // Désactivation de l'édition du champ lastName
          />
        </div>
        <div>
          <button className="edit-profile-button" type="submit">Save</button>
          <button className="edit-profile-button" type="button" onClick={onCancel}>Cancel</button> {/* Bouton pour annuler l'édition du profil */}
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './form.scss';

function Form() {
  const [email, setEmail] = useState(''); // État local pour l'email
  const [password, setPassword] = useState(''); // État local pour le mot de passe
  const dispatch = useDispatch(); // Obtention de la fonction dispatch pour déclencher des actions Redux
  const navigate = useNavigate(); // Hook navigate pour la navigation programmatique
  const error = useSelector(state => state.auth.error); // Sélection de l'erreur depuis le store Redux

  const submitHandler = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    dispatch(signup({ email, password })) // Dispatch de l'action signup avec les données email et password
      .unwrap() // Déballe le résultat de l'action asynchrone (pour les actions créées avec createAsyncThunk)
      .then(() => { // Fonction exécutée après une inscription réussie
        setEmail(''); // Réinitialisation de l'état local pour l'email
        setPassword(''); // Réinitialisation de l'état local pour le mot de passe
        navigate('/user'); // Redirection vers la page utilisateur après inscription réussie
      })
      .catch(() => {}); // Gestion des erreurs (facultatif)
  };

  const handleClearError = () => {
    dispatch(clearError()); // Dispatch de l'action clearError pour effacer les messages d'erreur
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p className="error-message">{error}</p>}
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état local pour l'email
          onFocus={handleClearError} // Appel à clearError lorsque le champ email reçoit le focus
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état local pour le mot de passe
          onFocus={handleClearError} // Appel à clearError lorsque le champ password reçoit le focus
        />
      </div>
      <div className="checkbox-wrapper">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">Sign In</button>
    </form>
  );
}

export default Form;
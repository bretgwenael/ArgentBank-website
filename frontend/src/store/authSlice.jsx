import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

// Thunk pour l'inscription et la récupération du token
export const signup = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    console.log('API response:', res.data); // Vérification de la réponse de l'API
    return res.data.body.token; // Ne retourner que le token
  } catch (error) {
    console.log('API error:', error.response.data); // Vérification de l'erreur de l'API
    return rejectWithValue(error.response.data); // Rejeter avec la valeur d'erreur de l'API
  }
});

// Thunk pour récupérer les informations du profil
export const getProfile = createAsyncThunk('auth/getProfile', async (token, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Profile response:', res.data); // Vérification de la réponse du profil
    return res.data.body; // Retourner les données du profil
  } catch (error) {
    console.log('Profile error:', error.response.data); // Vérification de l'erreur du profil
    return rejectWithValue(error.response.data); // Rejeter avec la valeur d'erreur du profil
  }
});

// Thunk pour mettre à jour les informations du profil
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState(); // Obtenir l'état authentifié actuel
    const res = await axios.put('http://localhost:3001/api/v1/user/profile', profileData, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    console.log('Update response:', res.data); // Vérification de la réponse de mise à jour
    return res.data.body; // Retourner les données mises à jour
  } catch (error) {
    console.log('Update error:', error.response.data); // Vérification de l'erreur de mise à jour
    return rejectWithValue(error.response.data); // Rejeter avec la valeur d'erreur de mise à jour
  }
});

export const clearError = createAction('auth/clearError'); // Définir clearError comme une action avec createAction

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, // Initialise le token à null
    isLoggedIn: false, // Initialise isLoggedIn à false
    loading: false, // Initialise loading à false
    error: null, // Initialise error à null
    user: {
      email: "", // Initialise email à une chaîne vide
      firstName: "", // Initialise firstName à une chaîne vide
      lastName: "", // Initialise lastName à une chaîne vide
      userName: "", // Initialise userName à une chaîne vide
    },
  },
  reducers: {
    logout: (state) => {
      state.token = null; // Réinitialise le token à null lors de la déconnexion
      state.isLoggedIn = false; // Définit isLoggedIn à false lors de la déconnexion
      state.loading = false; // Définit loading à false lors de la déconnexion
      state.error = null; // Réinitialise error à null lors de la déconnexion
      state.user = { email: "", firstName: "", lastName: "", username: "" }; // Réinitialise le profil utilisateur lors de la déconnexion
    },
    clearError: (state) => {
      state.error = null; // Réinitialise error à null lorsqu'on efface l'erreur
    }
  },
  extraReducers: (builder) => {
    builder
      // Gérer les états de l'inscription
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload; // Stocke le token dans l'état lors de l'inscription réussie
        state.isLoggedIn = true; // Met à jour isLoggedIn à true lors de l'inscription réussie
        state.loading = false; // Met à jour loading à false lors de l'inscription réussie
        state.error = null; // Réinitialise error à null lors de l'inscription réussie
      })
      .addCase(signup.pending, (state) => {
        state.loading = true; // Met à jour loading à true pendant le chargement de l'inscription
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false; // Met à jour loading à false lors de l'échec de l'inscription
        state.isLoggedIn = false; // Met à jour isLoggedIn à false lors de l'échec de l'inscription
        state.error = action.payload.message || 'An error occurred.'; // Stocke le message d'erreur ou un message par défaut lors de l'échec de l'inscription
      })
      // Gérer les états de la récupération du profil
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Stocke les données du profil dans l'état lors de la récupération réussie du profil
        state.loading = false; // Met à jour loading à false lors de la récupération réussie du profil
        state.error = null; // Réinitialise error à null lors de la récupération réussie du profil
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true; // Met à jour loading à true pendant le chargement de la récupération du profil
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false; // Met à jour loading à false lors de l'échec de la récupération du profil
        state.error = 'Failed to fetch profile.'; // Stocke un message d'erreur lors de l'échec de la récupération du profil
      })
      // Gérer les états de la mise à jour du profil
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Met à jour le profil utilisateur dans l'état lors de la mise à jour réussie du profil
        state.loading = false; // Met à jour loading à false lors de la mise à jour réussie du profil
        state.error = null; // Réinitialise error à null lors de la mise à jour réussie du profil
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true; // Met à jour loading à true pendant le chargement de la mise à jour du profil
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false; // Met à jour loading à false lors de l'échec de la mise à jour du profil
        state.error = 'Failed to update profile.'; // Stocke un message d'erreur lors de l'échec de la mise à jour du profil
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Thunk pour l'inscription et la récupération du token
export const signup = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    console.log('API response:', res.data); // verif reponse api
    return res.data.body.token; // Return only the token
  } catch (error) {
    console.log('API error:', error.response.data); // Check the API error
    return rejectWithValue(error.response.data);
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

    console.log('Profile response:', res.data);
    return res.data.body;
  } catch (error) {
    console.log('Profile error:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

// Thunk pour mettre à jour les informations du profil
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const res = await axios.put('http://localhost:3001/api/v1/user/profile', profileData, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    console.log('Update response:', res.data);
    return res.data.body;
  } catch (error) {
    console.log('Update error:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    user: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "", // Corrected field name to match your form
    },
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.user = { email: "", firstName: "", lastName: "", username: "" }; // Reset profile on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Gérer les états de l'inscription
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload; // Store the token in the state
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = 'An error occurred. Awkward...';
      })
      // Gérer les états de la récupération du profil
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Store the profile data in the state
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch profile.';
      })
      // Gérer les états de la mise à jour du profil
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Update the user profile in the state
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to update profile.';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
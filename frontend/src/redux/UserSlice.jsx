import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials) => {
        const request = await axios.post(`http://localhost:3001/api/v1/user/login`, userCredentials);
        const response = await request.data.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
        } 
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    reducers:{
        userLogin(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            console.log(action.payload);
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            console.log(action.payload);
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = true;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        })
    }
});

export const {userLogin}=userSlice.actions;
export default userSlice.reducer;
// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // This will store the user data
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      
        state.userInfo = action.payload; // action.payload should contain the user data
        state.isAuthenticated = true;
     
    },
    logout: (state) => {
        state.userInfo = null;
    },
    
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

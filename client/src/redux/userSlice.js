// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // This will store the user data
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      
      state.userInfo = action.payload;
     
    },
    
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

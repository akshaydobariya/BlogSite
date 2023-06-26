import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState: { email: null },
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = null;
    },
  },
});
export const { login, logout } = LoginSlice.actions;
export default LoginSlice.reducer;

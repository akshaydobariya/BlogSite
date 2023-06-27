import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState: { email: null, selectedBlog: null },
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = null;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});
export const { login, logout, setSelectedBlog, clearSelectedBlog } =
  LoginSlice.actions;
export default LoginSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../Feature/LoginSlice";

export const store = configureStore({
  reducer: {
    login: LoginSlice,
  },
});

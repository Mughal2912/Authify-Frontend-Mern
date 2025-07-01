import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./User/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
});

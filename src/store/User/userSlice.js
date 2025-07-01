// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPassword,
  forgotPassword,
  loadUser,
  registerUser,
  resetPassword,
  updateUserProfile,
  userDelete,
  userLogin,
  userLogOut,
  verifyUser,
} from "./userSliceReducers";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, //for storing user data
    tempUser: null, //when user give credentials and got otp
    isVerified: false, //when user verify the otp now user is authenticated
    isLoading: false,
    error: null,
    logOutMessage: "",
    updateProfileMessage: "",
    changeUserPasswordMessage: "",
    forgotPasswordMessage: "",
    resetPasswordMessage: "",
    deleteUserMessage: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLogoutMessage: (state) => {
      state.logOutMessage = "";
    },
    cleareUpdateProfileMessage: (state) => {
      state.updateProfileMessage = "";
    },
    clearUserPasswordMessage: (state) => {
      state.changeUserPasswordMessage = "";
    },
    clearForgotPasswordMessage: (state) => {
      state.forgotPasswordMessage = "";
    },
    cleareResetPasswordMessage: (state) => {
      state.resetPasswordMessage = "";
    },
    cleareUserDeleteMessage: (state) => {
      state.deleteUserMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempUser = null;
        state.isVerified = true;
        state.user = action.payload; // Store the user data in the state
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store the user data in the state
        state.isVerified = true; // Set isVerified to true after successful login
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isVerified = false;
        state.logOutMessage = action.payload;
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerified = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.updateProfileMessage = action.payload?.message;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.changeUserPasswordMessage = action.payload?.message;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordMessage = action.payload?.message;
        state.user = action.payload;
        state.isVerified = true; // Set isVerified to true after successful password reset
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isVerified = false;
        state.deleteUserMessage = action.payload;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {
  clearError,
  clearLogoutMessage,
  cleareUpdateProfileMessage,
  clearUserPasswordMessage,
  clearForgotPasswordMessage,
  cleareResetPasswordMessage,
  cleareUserDeleteMessage,
} = userSlice.actions;

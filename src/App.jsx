import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import OptVerification from "./Pages/OptVerification";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";
import UserProfile from "./Pages/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { loadUser } from "./store/User/userSliceReducers";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleareUpdateProfileMessage,
  cleareUserDeleteMessage,
  clearLogoutMessage,
  clearUserPasswordMessage,
} from "./store/User/userSlice";
import { toast } from "react-toastify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

export default function App() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const {
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
  } = useSelector((state) => state.auth);
  // console.log(updateProfileMessage);

  useEffect(() => {
    let timeout;

    if (logOutMessage) {
      toast.success(logOutMessage);
      timeout = setTimeout(() => {
        Dispatch(clearLogoutMessage());
        Navigate("/sign-in", { replace: true });
      }, 1500);
    }

    if (updateProfileMessage) {
      toast.success(updateProfileMessage);
      timeout = setTimeout(() => {
        Dispatch(cleareUpdateProfileMessage());
        Navigate("/user/profile", { replace: true });
      }, 1500);
    }

    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      timeout = setTimeout(() => {
        Dispatch(clearUserPasswordMessage());
        Navigate("/user/profile", { replace: true });
      }, 1500);
    }

    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      timeout = setTimeout(() => {
        Dispatch(cleareUserDeleteMessage());
        Navigate("/sign-in", { replace: true });
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
  ]);

  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      isFetchedRef.current = true;
      Dispatch(loadUser());
    }
  }, []);
  return (
    <div className="bg-light text-dark min-h-screen relative w-[100%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/register/otp-verification/:email/:phone"
          element={<OptVerification />}
        />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/password/reset/:token" element={<ResetPassword />} />
        // Protected Routes
        <Route element={<ProtectedRoute />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </div>
  );
}

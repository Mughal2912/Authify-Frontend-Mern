import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDelete, userLogOut } from "../store/User/userSliceReducers.js";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import { clearError } from "../store/User/userSlice.js";

const UserProfile = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { user, error } = useSelector((state) => state.auth);
  // console.log(logOutMessage);
  const userImageId = {
    oldAvatarId: user?.data?.avatar?.public_id,
  };
  const handleLogout = () => {
    Dispatch(userLogOut());
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page
    Navigate("/user/edit-profile");
  };

  const handleChangePassword = () => {
    Navigate("/user/change-password");
  };

  const handleDeleteAccount = () => {
    Dispatch(userDelete(userImageId));
    toast.error("Account deleted successfully!");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      Dispatch(clearError());
    }
  }, [error]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        {/* Left Side */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Welcome, <span className="text-accent">{user?.data?.name}</span>
          </h1>
          <p className="text-lg text-white/80 text-center">
            Manage your profile and personal information.
          </p>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white space-y-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={user?.data?.avatar?.url || "/srs/assets/profile.png"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-accent shadow-lg object-cover"
            />
          </div>

          {/* Info Fields */}
          <div className="space-y-3 text-left">
            <p className="flex items-center gap-3">
              <FaUser /> <span className="font-medium">Name:</span>{" "}
              {user?.data?.name}
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope /> <span className="font-medium">Email:</span>{" "}
              {user?.data?.email}
            </p>
            <p className="flex items-center gap-3">
              <FaPhone /> <span className="font-medium">Phone:</span>{" "}
              {user?.data?.phone}
            </p>
            <p className="flex items-center gap-3">
              <FaCalendar /> <span className="font-medium">Joined:</span>{" "}
              {new Date(user?.data?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-items-center">
            <button
              onClick={handleEditProfile}
              className="cursor-pointer w-48 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="cursor-pointer w-48 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccount}
              className="cursor-pointer w-48 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer w-48 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

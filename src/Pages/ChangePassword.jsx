import React, { useEffect, useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../store/User/userSliceReducers";
import { useNavigate } from "react-router-dom";
import { clearError, clearUserPasswordMessage } from "../store/User/userSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const { error, isLoading, changeUserPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Dispatch(changeUserPassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }

    // if (changeUserPasswordMessage) {
    //   toast.success(changeUserPasswordMessage);
    //   Navigate("/user/profile", { replace: true });
    //   Dispatch(clearUserPasswordMessage());
    // }
  }, [error]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Change <span className="text-accent">Password</span>
          </h1>
          <p className="text-lg text-navText/80 text-center">
            Update your password regularly to keep your account secure.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              {
                name: "oldPassword",
                placeholder: "Current Password",
                label: "old",
              },
              {
                name: "newPassword",
                placeholder: "New Password",
                label: "new",
              },
              {
                name: "confirmPassword",
                placeholder: "Confirm New Password",
                label: "confirm",
              },
            ].map(({ name, placeholder, label }) => (
              <div className="relative" key={name}>
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
                <input
                  type={visible[label] ? "text" : "password"}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                />
                <span
                  onClick={() => toggleVisibility(label)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 cursor-pointer text-lg"
                >
                  {visible[label] ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-accent text-nevText rounded-md font-semibold text-sm transition hover:bg-primary hover:scale-105 shadow-lg hover:text-accent cursor-pointer ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

import { useEffect, useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/User/userSliceReducers";
import { useDispatch, useSelector } from "react-redux";
import { cleareResetPasswordMessage } from "../store/User/userSlice";
import { toast } from "react-toastify";

function ResetPassword() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isLoading, error, resetPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const { token } = useParams();
  //   console.log(token);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    token,
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(resetPassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
    if (resetPasswordMessage) {
      toast.success(resetPasswordMessage);
      setFormData({
        newPassword: "",
        confirmPassword: "",
        token: "",
      });
      Dispatch(cleareResetPasswordMessage());
      Navigate("/user/profile", { replace: true });
    }
  }, [error, resetPasswordMessage]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Reset <span className="text-accent">Password</span>
          </h1>
          <p className="text-lg text-navText/80 text-center">
            Enter your new password and confirm it to reset.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/60"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/60"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-accent text-nevText rounded-md font-semibold text-sm transition hover:bg-primary hover:scale-105 shadow-lg hover:text-accent cursor-pointer ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Reseting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;

import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../store/User/userSliceReducers";
import {
  clearError,
  clearForgotPasswordMessage,
} from "../store/User/userSlice";
import { toast } from "react-toastify";

function ForgotPassword() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isLoading, error, forgotPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      Dispatch(clearError());
    }

    //if user already verified
    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);
      Dispatch(clearForgotPasswordMessage());
      setEmail("");
    }
  }, [error, forgotPasswordMessage]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Forgot <span className="text-accent">Password?</span>
          </h1>
          <p className="text-lg text-navText/80 text-center">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-accent text-nevText rounded-md font-semibold text-sm transition hover:bg-primary hover:scale-105 shadow-lg hover:text-accent cursor-pointer ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;

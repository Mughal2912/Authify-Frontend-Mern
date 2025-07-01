import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/User/userSliceReducers";
import { toast } from "react-toastify";

const SignIn = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isLoading, error, isVerified, user } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    Dispatch(userLogin(formData));
    if (isVerified) {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const userToastShown = useRef(false);

  useEffect(() => {
    if (error) {
      toast.error(error); //show error message
      // Dispatch(clearError());
    }
    if (isVerified && !userToastShown.current) {
      toast.success(user?.message);
      userToastShown.current = true;
      // setToastShown(true); // prevent future toasts
      Navigate("/user/profile", { replace: true }); //redirect to user profile page
    }
  }, [error, isVerified]);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-navText bg-gradient-to-br from-primary via-accent to-primaryLight relative min-h-screen">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="container px-6 mt-10 py-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full lg:w-[85%] xl:w-[65%]">
        {/* Left Side: Text Section */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Welcome Back to <span className="text-accent">Authify</span>
          </h1>
          <p className="text-lg text-navText/80 text-center">
            Enter your credentials to securely access your account.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer text-lg focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-accent text-nevText rounded-md font-semibold text-sm transition hover:bg-primary hover:scale-105 shadow-lg hover:text-accent cursor-pointer ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-sm text-white/70">
              Don’t have an account?
              <Link
                to="/sign-up"
                className="text-accent underline hover:text-white"
              >
                Register here
              </Link>
            </p>
            <Link
              to="/user/forgot-password"
              className="text-sm text-nevText hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

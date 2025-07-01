import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUser } from "../store/User/userSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../store/User/userSlice";

const VerifyOtp = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  //fetching state from redux store
  const { isLoading, error, isVerified, tempUser, user } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);
  //   const location = useLocation();
  //   const user = location?.state?.user;

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d{5}$/.test(paste)) return;
    const newOtp = paste.split("");
    setOtp(newOtp);
    newOtp.forEach((digit, i) => {
      inputsRef.current[i].value = digit;
    });
    inputsRef.current[4].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    // console.log("OTP entered:", finalOtp);
    const data = {
      otp: finalOtp,
      email: tempUser?.data?.email,
      phone: tempUser?.data?.phone,
    };

    Dispatch(verifyUser(data));

    if (isVerified) {
      setOtp(new Array(6).fill("")); // Clear the OTP input fields
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message); //show error message
      Dispatch(clearError());
    }

    //if user already verified
    if (isVerified) {
      Navigate("/user/profile", { replace: true }); //redirect to user profile page
      toast.success(user?.message);
    }
  }, [error, tempUser, Navigate, Dispatch, isVerified]);

  return (
    <section className="h-screen bg-gradient-to-br from-primary via-accent to-primaryLight flex flex-col justify-center items-center text-center text-navText relative">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="container px-6 py-12 relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-white">
            OTP Verification
          </h2>
          <p className="text-navText mb-6 text-sm">
            Enter the 6-digit code sent to your email to verify your identity.
          </p>
          <form onSubmit={handleSubmit} onPaste={handlePaste}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                required
                value={tempUser?.data?.email || ""}
                readOnly
              />
            </div>

            <div className="mb-6">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                required
                value={tempUser?.data?.phone || ""}
                readOnly
              />
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="w-12 h-12 text-center rounded-lg bg-white/20 text-white font-bold text-xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-accent cursor-pointer text-nevText text-sm py-3 px-6 rounded-full w-full font-semibold hover:bg-primary transition-all hover:text-accent ${
                isLoading && "opacity-50 hover:cursor-not-allowed"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, isVerified } = useSelector((state) => state.auth);

  return (
    <section className="h-screen bg-gradient-to-br from-primary via-accent to-primaryLight flex flex-col justify-center items-center text-center text-navText">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="w-full px-6 py-12 relative z-10">
        {isVerified ? (
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            Welcome back,{" "}
            <span className="text-accent">{user?.data?.name}</span>
          </h1>
        ) : (
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            Welcome to <span className="text-accent">Authify</span>
          </h1>
        )}
        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Authify offers powerful authentication services to secure your web
          apps with ease. Fast. Reliable. Beautifully integrated.
        </p>
        {isVerified ? (
          <Link
            to={"/user/profile"}
            className="bg-accent text-white py-3 px-8 rounded-full text-lg font-semibold transition-all hover:bg-primary hover:scale-105 shadow-lg"
          >
            Go to profile
          </Link>
        ) : (
          <Link
            to={"/sign-in"}
            className="bg-accent text-white py-3 px-8 rounded-full text-lg font-semibold transition-all hover:bg-primary hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </section>
  );
};

export default Home;

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";

function SignUp() {
  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col lg:flex-row items-center justify-center container px-4 sm:px-6 py-8 xl:!my-0 !my-12 md:py-16 lg:py-24">
        {/* Image section - hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:flex-1 lg:pr-12 xl:pr-24">
          <img 
            src="/Side Image.png" 
            alt="Sign up illustration" 
            className="w-full h-auto max-w-xl mx-auto"
          />
        </div>

        {/* Form section */}
        <div className="w-full max-w-md md:max-w-lg lg:flex-1 lg:max-w-none">
          <div className="text-center lg:text-left mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide inter mb-4 md:mb-6">
              Create an account
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Enter your details below</p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <input
              className="w-full border-b-2 border-gray-300 p-2 sm:p-3 outline-none focus:border-blue-500 transition"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full border-b-2 border-gray-300 p-2 sm:p-3 outline-none focus:border-blue-500 transition"
              type="password"
              placeholder="Password"
            />

            <div className="flex flex-col gap-3 sm:gap-4 mt-2">
              <button className="w-full bg-blue-600 text-white py-3 sm:py-4 font-medium rounded hover:bg-blue-700 transition duration-300 ease-in-out active:scale-95">
                Create Account
              </button>
              <button className="w-full border border-gray-300 text-black py-3 sm:py-4 flex justify-center items-center gap-2 sm:gap-4 rounded hover:bg-black hover:text-white transition duration-300 ease-in-out active:scale-95">
                <img 
                  src="/icons/Icon-Google.svg" 
                  alt="Google icon" 
                  className="w-5 h-5"
                />
                <span>Sign up with Google</span>
              </button>
            </div>

            <p className="text-center text-sm sm:text-base mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline ml-1 sm:ml-3 hover:text-blue-700 transition">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignUp;
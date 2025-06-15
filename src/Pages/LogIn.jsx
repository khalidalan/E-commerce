import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";

function LogIn() {
  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col lg:flex-row items-center justify-center container px-4 sm:px-6 py-8 xl:!my-0 !my-12 md:py-16 lg:py-24">
        {/* Image section - hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:flex-1 lg:pr-12 xl:pr-24">
          <img 
            src="/Side Image.png" 
            alt="Login illustration" 
            className="w-full h-auto max-w-xl mx-auto"
          />
        </div>

        {/* Form section */}
        <div className="w-full max-w-md md:max-w-lg lg:flex-1 lg:max-w-none">
          <div className="text-center lg:text-left mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide inter mb-4 md:mb-6">
              Log in to Exclusive
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

            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 sm:gap-0">
              <button className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 sm:px-8 font-medium rounded hover:bg-blue-700 transition duration-300 ease-in-out active:scale-95">
                Log in
              </button>
              <a 
                href="#" 
                className="text-blue-600 hover:underline text-sm sm:text-base transition-colors"
              >
                Forget Password?
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LogIn;
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 ">
      <div className="container !px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold inter">Exclusive</h3>
            <div className="space-y-4">
              <h4 className="text-xl font-medium">Subscribe</h4>
              <p className="text-gray-300">Get 10% off your first order</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Support</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Account</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                My Account
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Login / Register
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Cart
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Wishlist
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Shop
              </a>
            </div>
          </div>

          {/* Quick Link Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Quick Link</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Terms Of Use
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Download App Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Download App</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Save $3 with App New User Only
              </p>

              {/* QR Code and App Store Links */}
              <div className="flex gap-3">
                <img src="/public/Frame 719.png" alt="" />
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-6 pt-4">
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <img src="/public/socialMediaIcon/Icon-Facebook.svg" alt="" />
                </a>

                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                                 <img src="/public/socialMediaIcon/Icon-Twitter.svg" alt="" />

                </a>

                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                                    <img src="/public/socialMediaIcon/icon-instagram.svg" alt="" />

                </a>

                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                                  <img src="/public/socialMediaIcon/Icon-Linkedin.svg" alt="" />

                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="  mt-12 pt-8 pb-6 text-center">
          <p className="text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

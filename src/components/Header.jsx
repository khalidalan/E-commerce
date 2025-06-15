import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Contact", to: "/contact" },
    { label: "About", to: "/about" },
    { label: "Sign Up", to: "/signup" },
  ];

  return (
    <header className="flex border-b bg-white border-gray-200 sticky z-50 top-13">
      <div className="container flex items-center justify-between xl:!py-8 !py-4">
        {/* Logo */}
        <div className="hidden xl:flex">
          <h3 className="inter font-bold text-2xl">Exclusive</h3>
        </div>

        {/* Hamburger Button */}
        <div className="xl:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src="/icons/hamburgerMenu.svg" alt="Menu" />
          </button>
        </div>

        {/* Desktop Menu */}

        <ul className="hidden xl:flex items-center text-base">
          {navLinks.map(({ label, to }) => (
            <li className="mx-4" key={label}>
              <Link
                className="transition-all duration-300 ease-in-out hover:text-blue-600"
                to={to}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden fixed top-0 left-0 h-full w-full  bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`xl:hidden fixed top-0 left-0 h-full w-[75%] max-w-sm bg-white shadow-md z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="p-6 flex flex-col gap-4 text-base mt-12">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  className="transition-all duration-300 ease-in-out hover:text-blue-600"
                  to={to}
                  onClick={() => setIsOpen(false)} // يقفل المينيو بعد الضغط
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Search and Icons */}
        <div className="flex items-center gap-5">
          <div className="flex items-center bg-neutral-100 py-2 px-5 rounded-lg">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="outline-none placeholder:text-xs w-full"
            />
            <img
              className="cursor-pointer"
              src="/icons/Component 2.svg"
              alt="Search"
            />
          </div>

          <Link to="/wishlist">
            <button className="p-2 rounded-full hover:bg-blue-100 active:scale-90 transition-all duration-300 ease-in-out">
              <img src="/icons/Wishlist.svg" alt="Wishlist" />
            </button>
          </Link>

          <Link to="/cart">
            <button className="p-2 rounded-full hover:bg-blue-100 active:scale-90 transition-all duration-300 ease-in-out">
              <img src="/icons/Cart1 with buy.svg" alt="Cart" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

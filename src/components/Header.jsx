import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import allProducts from "../components/AllProducts1";
import { useTranslation } from "react-i18next";

function Header() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { wishlistCount } = useWishlist();
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const userMenuRef = useRef(null);

  const navLinks = [
    { label: t("navigation.home"), to: "/" },
    { label: t("navigation.contact"), to: "/contact" },
    { label: t("navigation.about"), to: "/about" },
    ...(currentUser ? [] : [{ label: t("navigation.signUp"), to: "/signup" }]),
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.category &&
            product.category.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 5);

    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery("");
      setIsMobileSearchOpen(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearchResults(false);
    setSearchQuery("");
    setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getImagePath = (imagePath) => {
    if (!imagePath) return "/placeholder-image.png";
    return imagePath.replace("/public/", "/");
  };

  const getUserInitial = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="flex border-b bg-white border-gray-200 sticky z-50 top-13">
      <div className="container flex items-center justify-between xl:!py-8 !py-4 px-4 sm:px-6 lg:px-8">
        <div className="hidden sm:flex">
          <Link to="/">
            <h3 className="inter font-bold text-xl sm:text-2xl">
              {t("navigation.exclusive")}
            </h3>
          </Link>
        </div>

        <div className="sm:hidden flex-1">
          <Link to="/">
            <h3 className="inter font-bold text-lg">
              {t("navigation.exclusive")}
            </h3>
          </Link>
        </div>

        <div className="xl:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <img
              src="/icons/hamburgerMenu.svg"
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
        </div>

        <ul className="hidden xl:flex items-center text-sm lg:text-base">
          {navLinks.map(({ label, to }) => (
            <li className="mx-2 lg:mx-4" key={label}>
              <Link
                className="transition-all duration-300 ease-in-out hover:text-blue-600 px-2 py-1"
                to={to}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`xl:hidden fixed top-0 left-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`xl:hidden fixed top-0 left-0 h-full w-[85%] sm:w-[75%] max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <h3 className="inter font-bold text-xl">Exclusive</h3>
            </Link>
          </div>
          <ul className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 text-base mt-4 sm:mt-8">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  className="block py-2 px-3 rounded-md transition-all duration-300 ease-in-out hover:text-blue-600 hover:bg-blue-50"
                  to={to}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {currentUser && (
              <>
                <li className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {getUserInitial()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/account"
                    className="block py-2 px-3 rounded-md transition-all duration-300 ease-in-out hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded-md transition-all duration-300 ease-in-out hover:text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          <div className="relative">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 text-gray-700"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="ar">🇸🇦 AR</option>
              <option value="de">🇩🇪 DE</option>
            </select>
          </div>

          <div className="hidden md:flex relative" ref={searchRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-neutral-100 py-2 px-3 lg:px-5 rounded-lg min-w-0"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t("navigation.search")}
                className="outline-none placeholder:text-xs w-full bg-transparent min-w-0"
              />
              <button
                type="submit"
                className="cursor-pointer ml-2 flex-shrink-0"
              >
                <img src="/icons/Component 2.svg" alt="Search" />
              </button>
            </form>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={getImagePath(product.image)}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 border-t bg-gray-50">
                  <button
                    onClick={() =>
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
                    }
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              </div>
            )}

            {showSearchResults &&
              searchResults.length === 0 &&
              searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center">
                  <p className="text-sm text-gray-500">
                    No products found for "{searchQuery}"
                  </p>
                </div>
              )}
          </div>

          <div className="md:hidden" ref={mobileSearchRef}>
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-300 ease-in-out"
            >
              <img
                src="/icons/Component 2.svg"
                alt="Search"
                className="w-5 h-5"
              />
            </button>

            {isMobileSearchOpen && (
              <div className="absolute top-full right-0 left-0 mt-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <form onSubmit={handleSearchSubmit} className="p-4">
                  <div className="flex items-center bg-neutral-100 py-2 px-3 rounded-lg">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder={t("navigation.search")}
                      className="outline-none placeholder:text-xs w-full bg-transparent"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="cursor-pointer ml-2 flex-shrink-0"
                    >
                      <img
                        src="/icons/Component 2.svg"
                        alt="Search"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </form>

                {searchResults.length > 0 && (
                  <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={getImagePath(product.image)}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.png";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.length === 0 && searchQuery.trim() && (
                  <div className="p-4 border-t text-center">
                    <p className="text-sm text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/wishlist" className="relative">
            <button className="p-1.5 sm:p-2 rounded-full hover:bg-blue-100 active:scale-90 transition-all duration-300 ease-in-out">
              <img
                src="/icons/Wishlist.svg"
                alt="Wishlist"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center min-w-4">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </button>
          </Link>

          <Link to="/cart" className="relative">
            <button className="p-1.5 sm:p-2 rounded-full hover:bg-blue-100 active:scale-90 transition-all duration-300 ease-in-out">
              <img
                src="/icons/Cart1 with buy.svg"
                alt="Cart"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center min-w-4">
                  {cartItems.length > 9 ? "9+" : cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {currentUser && (
            <div className="hidden sm:block relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-300 ease-in-out"
              >
                <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {getUserInitial()}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {getUserInitial()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {currentUser.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/account"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      My Account
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          d="M4 12H13.5M6 15L3 12L6 9M11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H13C12.4696 20 11.9609 19.7893 11.5858 19.4142C11.2107 19.0391 11 18.5304 11 18V17"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!currentUser && (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              {t("auth.logIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

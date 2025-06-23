import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

function ProductCard({
  product,
  hovered,
  setHovered,
  isWished,
  isInCart,
  toggleWishlist,
  addToCart,
  slidesPerView,
}) {
  const cardWidth = `${100 / slidesPerView}%`;

  return (
    <div
      className="group flex-shrink-0 px-2"
      style={{ width: cardWidth }}
      onMouseEnter={() => setHovered(product.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex flex-col h-full">
        <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 h-full">
          <div className="absolute top-3 left-3 z-20 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {product.discount}
          </div>

          {product.isNew && (
            <div className="absolute top-10 left-3 z-20 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              New
            </div>
          )}

          <button
            onClick={(e) => toggleWishlist(product.id, e)}
            className={`absolute top-3 right-3 z-20 p-2 rounded-md transition-all duration-300 ${
              isWished
                ? "bg-red-50 text-red-500 border border-red-200"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500 border border-gray-200"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={isWished ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative transform transition-all duration-300 group-hover:scale-105">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-32 sm:max-h-40 lg:max-h-48 object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => addToCart(product.id, e)}
            className={`absolute w-full bottom-0 left-0 transition-all duration-300 transform font-medium ${
              isInCart
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } ${
              hovered === product.id
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            } px-4 py-3`}
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isInCart ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M16 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                )}
              </svg>
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </span>
          </button>
        </div>

        <div className="bg-white p-4 mt-3">
          <h3 className="font-medium text-gray-800 mb-2 leading-tight text-sm lg:text-base line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price}
            </span>
            <span className="text-gray-400 line-through font-medium text-sm">
              {product.oldPrice}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                product.stockStatus === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {product.stockStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sales({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const sliderRef = useRef(null);

  // Helper function to check if item is in cart
  const isItemInCart = (productId) => {
    if (Array.isArray(cartItems)) {
      return cartItems.some((item) => item.id === productId);
    } else if (cartItems && typeof cartItems.has === "function") {
      return cartItems.has(productId);
    } else if (cartItems && typeof cartItems === "object") {
      return cartItems.hasOwnProperty(productId);
    }
    return false;
  };

  // Helper function to check if item is in wishlist
  const isItemInWishlist = (productId) => {
    if (Array.isArray(wishlistItems)) {
      return wishlistItems.some((item) => item.id === productId);
    } else if (wishlistItems && typeof wishlistItems.has === "function") {
      return wishlistItems.has(productId);
    } else if (wishlistItems && typeof wishlistItems === "object") {
      return wishlistItems.hasOwnProperty(productId);
    }
    return false;
  };

  const toggleCart = (id, e) => {
    e.stopPropagation();
    if (isItemInCart(id)) {
      removeFromCart(id);
    } else {
      const product = products.find((p) => p.id === id);
      if (product) {
        addToCart(product);
      }
    }
  };

  // Get slides per view based on screen size
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      if (window.innerWidth < 1280) return 4;
      return 5;
    }
    return 5;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  // Update slides per view on window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setSlidesPerView(getSlidesPerView());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= products.length - slidesPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? products.length - slidesPerView : prev - 1
    );
  };

  return (
    <div className="relative container mx-auto px-4 py-8 ">
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
        <button
          onClick={prevSlide}
          className="group bg-white hover:bg-gray-50 shadow-md hover:shadow-lg p-3 rounded-full transition-all duration-300 border border-gray-200"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
        <button
          onClick={nextSlide}
          className="group bg-white hover:bg-gray-50 shadow-md hover:shadow-lg p-3 rounded-full transition-all duration-300 border border-gray-200"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 p-4 select-none"
        ref={sliderRef}
      >
        <div
          className="flex transition-transform duration-300 ease-out gap-4"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hovered={hovered}
              setHovered={setHovered}
              isWished={isItemInWishlist(product.id)}
              isInCart={isItemInCart(product.id)}
              toggleWishlist={toggleWishlist}
              addToCart={toggleCart}
              slidesPerView={slidesPerView}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(products.length / slidesPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * slidesPerView)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / slidesPerView) === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Sales;

// Cards2.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({
  product,
  onWishlistToggle,
  onAddToCart,
  isInWishlist = false,
  isInCart = false,
  showDiscount = true,
  showStock = true,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle?.(product.id, e);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(product.id, e);
  };

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 overflow-hidden cursor-pointer">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {showDiscount && product.discount && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              BESTSELLER
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleWishlistClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white hover:bg-red-50 text-gray-600 hover:text-red-500"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isInWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center h-full">
          <Link to={`/product/${product.id}`}>
            <img
              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              src={product.image}
              alt={product.name}
            />
          </Link>
        </div>

        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 right-0 
    ${
      isInCart
        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
    } 
    text-white font-medium py-3 transition-all duration-500 ease-out 
    ${
      isHovered
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4 pointer-events-none"
    }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
            {product.name}
          </h3>
          {showStock && product.stockStatus && (
            <span
              className={`text-xs font-medium ml-2 ${
                product.stockStatus === "In Stock"
                  ? "text-emerald-600"
                  : product.stockStatus === "Low Stock"
                  ? "text-amber-600"
                  : "text-red-600"
              }`}
            >
              {product.stockStatus}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-blue-600">
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.oldPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            ({product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
};

const Cards2 = ({ products }) => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const handleCartToggle = (productId, e) => {
    e.stopPropagation();
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const isInCart = cartItems.some((item) => item.id === productId);
    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-4 mt-16">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onWishlistToggle={toggleWishlist}
          onAddToCart={handleCartToggle}
          isInWishlist={wishlistItems.has(product.id)}
          isInCart={cartItems.some((item) => item.id === product.id)}
        />
      ))}
    </div>
  );
};

export { ProductCard, Cards2 };
export default Cards2;

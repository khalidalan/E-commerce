import { useState } from "react";

const ProductCard = ({ 
  product, 
  onWishlistToggle, 
  onAddToCart, 
  isInWishlist = false,
  isInCart = false,
  showDiscount = true,
  showStock = true,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle?.(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };



  return (
    <div 
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 overflow-hidden cursor-pointer">
        {/* Badges */}
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

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleWishlistClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white hover:bg-red-50 text-gray-600 hover:text-red-500'
            }`}
          >
            <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

         
        </div>

        {/* Product Image */}
        <div className="flex items-center justify-center h-full">
          <img 
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
            src={product.image} 
            alt={product.name} 
          />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 transition-all duration-500 ease-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {isInCart ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
            {product.name}
          </h3>
          {showStock && product.stockStatus && (
            <span className={`text-xs font-medium ml-2 ${
              product.stockStatus === 'In Stock' ? 'text-emerald-600' : 
              product.stockStatus === 'Low Stock' ? 'text-amber-600' : 'text-red-600'
            }`}>
              {product.stockStatus}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-blue-600">{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

const Cards2 = () => {
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());

  const products = [
    {
      id: 1,
      image: "/public/dogfood.png",
      name: "Breed Dry Dog Food",
      discount: "-40%",
      price: "$120",
      oldPrice: "$160",
      rating: 4,
      reviews: 88,
      stockStatus: "In Stock",
      isNew: false,
      isBestseller: true
    },
    {
      id: 2,
      image: "/public/camera.png",
      name: "CANON EOS DSLR Camera",
      discount: "-35%",
      price: "$150",
      oldPrice: "$260",
      rating: 4,
      reviews: 75,
      stockStatus: "Low Stock",
      isNew: true,
      isBestseller: false
    },
    {
      id: 3,
      image: "/public/laptop.png",
      name: "ASUS FHD Gaming Laptop",
      discount: "-30%",
      price: "$370",
      oldPrice: "$400",
      rating: 5,
      reviews: 99,
      stockStatus: "In Stock",
      isNew: false,
      isBestseller: true
    },
    {
      id: 4,
      image: "/public/cream.png",
      name: "Curology Product Set",
      discount: "-25%",
      price: "$375",
      oldPrice: "$400",
      rating: 4,
      reviews: 58,
      stockStatus: "In Stock",
      isNew: true,
      isBestseller: false
    },
    {
      id: 5,
      image: "/public/car.png",
      name: "Kids Electric Car",
      discount: "-25%",
      price: "$375",
      oldPrice: "$400",
      rating: 4,
      reviews: 58,
      stockStatus: "In Stock",
      isNew: false,
      isBestseller: false
    },
    {
      id: 6,
      image: "/public/shoes.png",
      name: "Jr. Zoom Soccer Cleats",
      discount: "-25%",
      price: "$375",
      oldPrice: "$400",
      rating: 4,
      reviews: 58,
      stockStatus: "Low Stock",
      isNew: false,
      isBestseller: false
    },
    {
      id: 7,
      image: "/public/g-black.png",
      name: "GP11 Shooter USB Gamepad",
      discount: "-25%",
      price: "$375",
      oldPrice: "$400",
      rating: 4,
      reviews: 58,
      stockStatus: "In Stock",
      isNew: false,
      isBestseller: false
    },
    {
      id: 8,
      image: "/public/jacket.png",
      name: "Quilted Satin Jacket",
      discount: "-25%",
      price: "$375",
      oldPrice: "$400",
      rating: 4,
      reviews: 58,
      stockStatus: "In Stock",
      isNew: true,
      isBestseller: false
    },
    {
      id: 9,
      image: "/public/coat.png",
      name: "The north coat",
      discount: "-40%",
      price: "$120",
      oldPrice: "$160",
      rating: 4,
      reviews: 88,
      stockStatus: "In Stock",
      isNew: false,
      isBestseller: true
    },
    {
      id: 10,
      image: "/public/bag.png",
      name: "Gucci duffle bag",
      discount: "-35%",
      price: "$150",
      oldPrice: "$260",
      rating: 4,
      reviews: 75,
      stockStatus: "Low Stock",
      isNew: false,
      isBestseller: false
    },
  ];

  const handleWishlistToggle = (productId) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (productId) => {
    setCartItems(prev => new Set([...prev, productId]));
    console.log(`Product ${productId} added to cart`);
  };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-4 mt-16">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onWishlistToggle={handleWishlistToggle}
          onAddToCart={handleAddToCart}
          isInWishlist={wishlistItems.has(product.id)}
          isInCart={cartItems.has(product.id)}
        />
      ))}
    </div>
  );
};

// Export both components
export { ProductCard, Cards2 };
export default Cards2;
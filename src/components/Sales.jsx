    import { useState, useEffect, useRef } from "react";

    const products = [
      {
        id: 1,
        image: "/public/g-colored.png",
        name: "HAVIT HV-G92 Gamepad",
        discount: "-40%",
        price: "$120",
        oldPrice: "$160",
        rating: 4,
        reviews: 88,
        isNew: false,
        stockStatus: "In Stock"
      },
      {
        id: 2,
        image: "/public/keyboard.png",
        name: "AK-900 Wired Keyboard",
        discount: "-35%",
        price: "$950",
        oldPrice: "$1160",
        rating: 4,
        reviews: 75,
        isNew: false,
        stockStatus: "In Stock"
      },
      {
        id: 3,
        image: "/public/tv.png",
        name: "IPS LCD Gaming Monitor",
        discount: "-30%",
        price: "$370",
        oldPrice: "$400",
        rating: 5,
        reviews: 99,
        isNew: true,
        stockStatus: "In Stock"
      },
      {
        id: 4,
        image: "/public/chair.png",
        name: "S-Series Comfort Chair",
        discount: "-25%",
        price: "$375",
        oldPrice: "$400",
        rating: 4,
        reviews: 58,
        isNew: false,
        stockStatus: "In Stock"
      },
      {
        id: 5,
        image: "/public/bookshelf.png",
        name: "Small Bookshelf",
        discount: "-60%",
        price: "$360",
        oldPrice: "$504",
        rating: 5,
        reviews: 123,
        isNew: false,
        stockStatus: "Low Stock"
      },
      {
        id: 6,
        image: "/public/headphones.png",
        name: "RGB liquid CPU Cooler",
        discount: "-20%",
        price: "$160",
        oldPrice: "$234",
        rating: 3,
        reviews: 233,
        isNew: true,
        stockStatus: "In Stock"
      },
      {
        id: 7,
        image: "/public/laptop.png",
        name: "ASUS FHD Gaming Laptop",
        discount: "-30%",
        price: "$700",
        oldPrice: "$1000",
        rating: 3,
        reviews: 99,
        isNew: false,
        stockStatus: "In Stock"
      },
      {
        id: 8,
        image: "/public/shoes.png",
        name: "Jr. Zoom Soccer Cleats",
        discount: "-30%",
        price: "$80",
        oldPrice: "$100",
        rating: 4,
        reviews: 332,
        isNew: false,
        stockStatus: "In Stock"
      },
      {
        id: 9,
        image: "/public/camera.png",
        name: "CANON EOS DSLR Camera",
        discount: "-12%",
        price: "$500",
        oldPrice: "$600",
        rating: 4,
        reviews: 132,
        isNew: true,
        stockStatus: "In Stock"
      },
    ];

    function ProductCard({ product, hovered, setHovered, isWished, isInCart, toggleWishlist, addToCart, slidesPerView }) {
      const cardWidth = `${100 / slidesPerView}%`;

      return (
        <div
          className="group flex-shrink-0 px-2"
          style={{ width: cardWidth }}
          onMouseEnter={() => setHovered(product.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex flex-col h-full">
            {/* Card Container */}
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 h-full">
              
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-20 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                {product.discount}
              </div>

              {/* New Badge */}
              {product.isNew && (
                <div className="absolute top-10 left-3 z-20 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                  New
                </div>
              )}

              {/* Wishlist Button */}
              <button 
                onClick={(e) => toggleWishlist(product.id, e)}
                className={`absolute top-3 right-3 z-20 p-2 rounded-md transition-all duration-300 ${
                  isWished 
                    ? 'bg-red-50 text-red-500 border border-red-200' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500 border border-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Product Image Container */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">            
                {/* Product Image */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative transform transition-all duration-300 group-hover:scale-105">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-auto max-h-32 sm:max-h-40 lg:max-h-48 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => addToCart(product.id, e)}
                className={`absolute w-full bottom-0 left-0 transition-all duration-300 transform font-medium ${
                  isInCart 
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${
                  hovered === product.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                } px-4 py-3`}
              >
                <span className="flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isInCart ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M16 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    )}
                  </svg>
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </span>
              </button>
            </div>

            {/* Product Info */}
            <div className="bg-white p-4 mt-3">
              {/* Product Title */}
              <h3 className="font-medium text-gray-800 mb-2 leading-tight text-sm lg:text-base line-clamp-2">
                {product.name}
              </h3>
              
              {/* Price Section */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
                <span className="text-gray-400 line-through font-medium text-sm">
                  {product.oldPrice}
                </span>
              </div>
              
              {/* Rating Section */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < product.rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  product.stockStatus === 'In Stock' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {product.stockStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function Sales() {
      const [currentSlide, setCurrentSlide] = useState(0);
      const [hovered, setHovered] = useState(null);
      const [wishlistItems, setWishlistItems] = useState(new Set([1, 2, 3, 4]));
      const [cartItems, setCartItems] = useState(new Set());
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const sliderRef = useRef(null);

      const toggleWishlist = (id, e) => {
        e.stopPropagation();
        setWishlistItems((prev) => {
          const newSet = new Set(prev);
          newSet.has(id) ? newSet.delete(id) : newSet.add(id);
          return newSet;
        });
      };

      const addToCart = (id, e) => {
        e.stopPropagation();
        setCartItems((prev) => new Set([...prev, id]));
      };

      // Get slides per view based on screen size
      const getSlidesPerView = () => {
        if (typeof window !== 'undefined') {
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
        if (typeof window !== 'undefined') {
          const handleResize = () => setSlidesPerView(getSlidesPerView());
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }
      }, []);

      const nextSlide = () => {
        setCurrentSlide(prev => 
          prev >= products.length - slidesPerView ? 0 : prev + 1
        );
      };

      const prevSlide = () => {
        setCurrentSlide(prev => 
          prev <= 0 ? products.length - slidesPerView : prev - 1
        );
      };

      // Touch and mouse drag handlers
      const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX || e.touches?.[0]?.pageX || 0);
      };

      const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches?.[0]?.pageX || 0;
        const walk = (x - startX) * 2;
        
        if (Math.abs(walk) > 50) {
          if (walk > 0 && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
            setIsDragging(false);
          } else if (walk < 0 && currentSlide < products.length - slidesPerView) {
            setCurrentSlide(prev => prev + 1);
            setIsDragging(false);
          }
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.addEventListener('touchend', handleGlobalMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleGlobalMouseUp);
          document.removeEventListener('touchend', handleGlobalMouseUp);
        };
      }, []);

      return (
        <div className="relative container mx-auto px-4 py-8 ">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
            <button
              onClick={prevSlide}
              className="group bg-white hover:bg-gray-50 shadow-md hover:shadow-lg p-3 rounded-full transition-all duration-300 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
            <button
              onClick={nextSlide}
              className="group bg-white hover:bg-gray-50 shadow-md hover:shadow-lg p-3 rounded-full transition-all duration-300 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slider Container */}
          <div 
            className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 p-4 cursor-grab active:cursor-grabbing select-none"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <div 
              className="flex transition-transform duration-300 ease-out gap-4"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  hovered={hovered}
                  setHovered={setHovered}
                  isWished={wishlistItems.has(product.id)}
                  isInCart={cartItems.has(product.id)}
                  toggleWishlist={toggleWishlist}
                  addToCart={addToCart}
                  slidesPerView={slidesPerView}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(products.length / slidesPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentSlide / slidesPerView) === index
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      );
    }

    export default Sales; 
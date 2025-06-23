import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Star,
  Truck,
  RotateCcw,
  Eye,
  Plus,
  Minus,
} from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Cards from "../components/Cards";
import BlueBlock from "../components/BlueBlock";
import Footer from "../components/Footer";
import ProductsData from "../components/productsData";
import Products from "../components/AllProducts1";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const products = Products;

const productsData = ProductsData;
function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random()); 
  return shuffled.slice(0, count); 
}

const justForYou = getRandomProducts(products, 5);

const Details = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { id } = useParams();

  const product = useMemo(() => {
    const productId = parseInt(id);
    return productsData[productId] || null;
  }, [id]);

  const inWishlist = isInWishlist(product?.id);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "");
      setSelectedSize(product.sizes[0] || "");

      setTimeout(() => setIsLoading(false), 50);
    } else {
      setIsLoading(false);
    }
  }, [product]);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopHeader />
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
              <div className="flex-1 bg-gray-200 rounded-lg animate-pulse h-96" />
            </div>

            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('productDetails.productNotFound')}
          </h2>
          <p className="text-gray-600">
            {t('productDetails.productNotFoundMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-800">
            Account
          </a>
          <span>/</span>
          <a href="#" className="hover:text-gray-800">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-blue-600 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 bg-gray-50 rounded-lg p-8">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain transition-all duration-300"
                loading="eager"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {t('productDetails.reviews', { count: product.reviews })}
                </span>
                <span
                  className={`text-sm ${
                    product.stockStatus === "In Stock"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  | {product.stockStatus === "In Stock" 
                      ? t('productDetails.inStock') 
                      : t('productDetails.outOfStock')}
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}.00
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.oldPrice}.00
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {t('productDetails.discount')}: {product.discount}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-medium mb-3">
                  {t('productDetails.colors')}
                </h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full ${
                        color.color
                      } transition-all duration-200 ${
                        selectedColor === color.name
                          ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                          : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 1 && (
              <div>
                <h3 className="text-lg font-medium mb-3">
                  {t('productDetails.sizes')}
                </h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-blue-600 text-white border-blue-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:scale-105"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium mb-3">
                {t('productDetails.quantity')}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="flex-1 flex items-center justify-center"
                >
                  <button
                    onClick={() => {
                      addToCart(
                        {
                          ...product,
                          image: product.images[0],
                        },
                        quantity
                      );

                      navigate("/checkout");
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 hover:scale-105"
                  >
                    {t('productDetails.buyNow')}
                  </button>
                </Link>

                <button
                  className={`p-3 border rounded-md transition-all duration-200 hover:scale-105 ${
                    inWishlist
                      ? "bg-red-100 border-red-400"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={(e) => toggleWishlist(product.id, e)}
                >
                  <Heart
                    className="w-5 h-5"
                    color={inWishlist ? "#dc2626" : "currentColor"}
                    fill={inWishlist ? "#dc2626" : "none"}
                  />
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Truck className="w-6 h-6 text-gray-700" />
                <div>
                  <h4 className="font-medium">
                    {t('productDetails.freeDelivery')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('productDetails.deliveryNote')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <RotateCcw className="w-6 h-6 text-gray-700" />
                <div>
                  <h4 className="font-medium">
                    {t('productDetails.returnDelivery')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('productDetails.returnNote')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24"></div>
      <BlueBlock title={t('productDetails.relatedItems')} />
      <div className="mt-14"></div>
      <div className="container">
        <Cards products={justForYou} />
      </div>
      <div className="mt-44"></div>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Details;
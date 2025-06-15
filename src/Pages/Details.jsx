import React, { useState } from "react";
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

const Details = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);

  const colors = [
    { name: "black", color: "bg-gray-800" },
    { name: "red", color: "bg-blue-600" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const productImages = [
    "/public/analog/image 63.png",
    "/public/analog/image 58.png",
    "/public/analog/image 57.png",
    "/public/analog/image 59.png",
    "/public/analog/image 61.png",
  ];

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-800">
            Account
          </a>
          <span>/</span>
          <a href="#" className="hover:text-gray-800">
            Gaming
          </a>
          <span>/</span>
          <span className="text-gray-800">Havic HV G-92 Gamepad</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex space-x-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col space-y-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-lg p-8">
              <img
                src={productImages[selectedImage]}
                alt="Havic HV G-92 Gamepad"
                className="w-full h-96 object-contain "
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Havic HV G-92 Gamepad
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(150 Reviews)</span>
                <span className="text-sm text-green-600">| In Stock</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900 mb-4">
                $192.00
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </p>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-medium mb-3">Colours:</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.color} ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-lg font-medium mb-3">Size:</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Buy Buttons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Buy Now
              </button>

              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Truck className="w-6 h-6 text-gray-700" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <RotateCcw className="w-6 h-6 text-gray-700" />
                <div>
                  <h4 className="font-medium">Return Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-24"></div>
      <BlueBlock title="Related Items" />
      <div className="mt-14"></div>
      <Cards />
      <div className="mt-44"></div>

      <Footer />
    </div>
  );
};

export default Details;

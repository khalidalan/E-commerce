// Cards.jsx
import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image: "/public/coat.png",
    name: "The north coat",
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
    image: "/public/bag.png",
    name: "Gucci duffle bag",
    discount: "-35%",
    price: "$150",
    oldPrice: "$260",
    rating: 4,
    reviews: 75,
    isNew: true,
    stockStatus: "Low Stock"
  },
  {
    id: 3,
    image: "/public/headphones.png",
    name: "RGB liquid CPU Cooler",
    discount: "-30%",
    price: "$370",
    oldPrice: "$400",
    rating: 5,
    reviews: 99,
    isNew: false,
    stockStatus: "In Stock"
  },
  {
    id: 4,
    image: "/public/bookshelf.png",
    name: "Small BookSelf",
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
    image: "/public/chair.png",
    name: "S-Series Comfort Chair",
    discount: "-25%",
    price: "$375",
    oldPrice: "$400",
    rating: 4,
    reviews: 58,
    isNew: true,
    stockStatus: "In Stock"
  },
];

const Cards = ({ isWishlist = false }) => {
  const [hovered, setHovered] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(new Set([1, 2, 3, 4]));
  const [cartItems, setCartItems] = useState(new Set());

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

  const displayProducts = isWishlist
    ? products.filter((p) => wishlistItems.has(p.id))
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-4">
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          hovered={hovered}
          setHovered={setHovered}
          isWished={wishlistItems.has(product.id)}
          isInCart={cartItems.has(product.id)}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};




export default Cards;

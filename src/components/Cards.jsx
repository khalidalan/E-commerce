import { useState } from "react";
import ProductCard from "./ProductCard";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

const Cards = ({ isWishlist = false, products }) => {
  const [hovered, setHovered] = useState(null);
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart, removeFromCart, cartItems } = useCart();

  const handleCartToggle = (id, e) => {
    e.stopPropagation();
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const isInCart = cartItems.some((item) => item.id === id);
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
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
          isInCart={cartItems.some((item) => item.id === product.id)}
          toggleWishlist={toggleWishlist}
          toggleCart={handleCartToggle}
        />
      ))}
    </div>
  );
};

export default Cards;

// WishlistContext.js
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};



export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlistItems");
      if (!saved) return new Set();

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const validArray = parsed.filter(
          (item) => typeof item === "number" || typeof item === "string"
        );
        return new Set(validArray);
      }

      return new Set(); 
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wishlistItems", JSON.stringify([...wishlistItems]));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlistItems]);

  const toggleWishlist = (id, e) => {
    if (e) e.stopPropagation();

    setWishlistItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const addToWishlist = (id) => {
    setWishlistItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const clearWishlist = () => {
    setWishlistItems(new Set());
  };

  const getWishlistItems = () => {
    return Array.from(wishlistItems);
  };

  const value = {
    wishlistItems,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlistItems,
    isInWishlist: (id) => wishlistItems.has(id),
    wishlistCount: wishlistItems.size,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

import BlueBlock from "../components/BlueBlock";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import { useWishlist } from "../contexts/WishlistContext";
import Products from "../components/AllProducts1";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "react-i18next";

const allProducts = Products;

function getRandomProducts(products, count, excludeIds = []) {
  const availableProducts = products.filter(
    (product) => !excludeIds.includes(product.id)
  );
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function WishList() {
  const { t } = useTranslation();
  const { wishlistItems, wishlistCount, toggleWishlist } = useWishlist();
  const { cartItems, setCartItems } = useCart();

  const wishlistProducts = allProducts.filter((product) =>
    wishlistItems.has(product.id)
  );

  const justForYou = getRandomProducts(allProducts, 5, [...wishlistItems]);

  const handleMoveAllToCart = () => {
    if (wishlistProducts.length === 0) return;

    const updatedCart = [...cartItems];

    wishlistProducts.forEach((product) => {
      const existingItem = updatedCart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        updatedCart.push({
          ...product,
          quantity: 1,
        });
      }

      toggleWishlist(product.id);
    });

    setCartItems(updatedCart);

    Swal.fire({
      title: "Success!",
      text: `${wishlistProducts.length} items moved to cart successfully!`,
      icon: "success",
      confirmButtonText: "Great!",
      confirmButtonColor: "#ef4444",
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <div>
      <TopHeader />
      <Header />

      {wishlistCount > 0 && (
        <div className="flex container justify-between items-center pt-20 !my-12">
          <p className="text-lg font-medium">{t("wishlist.title")}</p>

          <button
            onClick={handleMoveAllToCart}
            className="px-6 xl:px-12 xl:py-4 py-2 border border-gray-600 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out rounded font-medium"
          >
            {t("wishlist.moveAllToCart")}
          </button>
        </div>
      )}

      <div className="container">
        {wishlistCount > 0 ? (
          <Cards products={wishlistProducts} isWishlist={true} />
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">♡</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {t("wishlist.emptyMessageTitle")}
            </h3>
            <p className="text-gray-500 mb-6">
              {t("wishlist.emptyMessageDesc")}
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              {t("wishlist.startShopping")}
            </Link>
          </div>
        )}
      </div>

      {wishlistCount > 0 && (
        <div className="pt-20 pb-16">
          <BlueBlock title={t("wishlist.justForYou")} />
          <div className="!pt-16 pb-36 container">
            <Cards products={justForYou} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default WishList;

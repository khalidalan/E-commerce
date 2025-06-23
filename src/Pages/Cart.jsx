import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();
  const { cartItems, setCartItems } = useCart();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getSubtotal = (item) => item.price * item.quantity;
  const getTotal = () =>
    cartItems.reduce((total, item) => total + getSubtotal(item), 0);
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <TopHeader />
      <Header />

      <div className="container mx-auto px-4 py-8 !my-12">
        <nav className="flex text-sm text-gray-600 mb-8">
          <span className="hover:text-blue-600 cursor-pointer">
            {t("cart.home")}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{t("cart.title")}</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t("cart.title")}
          </h1>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {getTotalItems()}{" "}
            {getTotalItems() === 1 ? t("cart.item") : t("cart.items")}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-4">
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4 font-semibold text-gray-700">
              <div className="col-span-6">{t("cart.product")}</div>
              <div className="col-span-2 text-center">{t("cart.price")}</div>
              <div className="col-span-2 text-center">{t("cart.quantity")}</div>
              <div className="col-span-2 text-center">{t("cart.total")}</div>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M16 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("cart.emptyTitle")}
                </h3>
                <p className="text-gray-500 mb-6">
                  {t("cart.emptyDescription")}
                </p>
                <Link to="/products">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                    {t("cart.continueShopping")}
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
                  >
                    <div className="lg:hidden">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition duration-200"
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-lg font-bold text-gray-900">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-gray-600">Qty:</label>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center py-2 border-0 focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${getSubtotal(item)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition duration-200"
                          >
                            ×
                          </button>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <p className="font-semibold text-gray-900">
                          ${item.price}
                        </p>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 text-center py-2 border-0 focus:outline-none"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <p className="font-semibold text-gray-900">
                          ${getSubtotal(item)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                  <div className="flex  flex-col sm:flex-row gap-4 justify-between">
                    <Link to="/products">
                      <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300 font-medium">
                        {t("cart.continueShopping")}
                      </button>
                    </Link>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => {
                          setCartItems([]);
                          localStorage.removeItem("cartItems");
                        }}
                        className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium"
                      >
                        {t("cart.clearCart")}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t("cart.orderSummary")}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("cart.subtotal")} ({getTotalItems()} {t("cart.items")})
                  </span>
                  <span className="font-semibold">${getTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("cart.shipping")}</span>
                  <span className="font-semibold text-green-600">
                    {t("cart.free")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("cart.tax")}</span>
                  <span className="font-semibold">
                    ${(getTotal() * 0.08).toFixed(2)}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">
                    {t("cart.total")}
                  </span>
                  <span className="font-bold text-gray-900">
                    ${(getTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link to="/checkout" className="w-full">
                <button
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300 mb-4"
                >
                  {t("cart.checkout")}
                </button>
              </Link>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {t("cart.secureMessage")}
                </div>

                <p className="text-xs text-gray-400">{t("cart.secureInfo")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;

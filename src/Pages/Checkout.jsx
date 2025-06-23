import { useState } from "react";
import { useTranslation } from 'react-i18next';
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couponCode, setCouponCode] = useState("");

  const { cartItems, cartTotal } = useCart();

  const orderItems = cartItems;
  const taxRate = 0.08;
  const tax = cartTotal * taxRate;
  const shipping = 0; 
  const total = cartTotal + tax + shipping;
  const subtotal = cartTotal;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, streetAddress, townCity, phoneNumber, emailAddress } =
      formData;

    if (
      !firstName.trim() ||
      !streetAddress.trim() ||
      !townCity.trim() ||
      !phoneNumber.trim() ||
      !emailAddress.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: t('checkout.missingTitle'),
        text: t('checkout.missingText'),
      });
      return;
    }

    if (paymentMethod === "cash") {
      Swal.fire({
        icon: "success",
        title: t('checkout.successTitle'),
        text: t('checkout.successText'),
      });
    } else if (paymentMethod === "bank") {
      navigate("/payment-details");
    }
  };

  const applyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      Swal.fire({
        icon: "success",
        title: t('checkout.validCoupon'),
        text: t('checkout.validCouponText'),
      });
    } else {
      Swal.fire({
        icon: "error",
        title: t('checkout.invalidCoupon'),
        text: t('checkout.invalidCouponText'),
      });
    }
    setCouponCode("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <Header />

      <div className="container mx-auto px-4 py-6 xl:!mt-12 !my-12 ">
        <nav className="flex text-sm text-gray-600 mb-8">
          <span className="hover:text-blue-600 cursor-pointer">{t('checkout.nav.account')}</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">{t('checkout.nav.product')}</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">{t('checkout.nav.viewCart')}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{t('checkout.nav.checkout')}</span>
        </nav>

        <div className="grid grid-cols-1 container lg:grid-cols-2 gap-8 xl:gap-12  xl:!mb-36">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('checkout.billingDetails')}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.firstName')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.firstName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.companyName')}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.companyName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.streetAddress')} *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.streetAddress')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.apartment')}
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.apartment')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.townCity')} *
                </label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.townCity')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.phoneNumber')} *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.phoneNumber')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.emailAddress')} *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder={t('checkout.emailAddress')}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="saveInfo"
                  className="ml-2 text-sm text-gray-700"
                >
                  {t('checkout.saveInfo')}
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('checkout.yourOrder')}
            </h2>

            <div className="space-y-4 mb-6">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">{t('checkout.subtotal')}:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">{t('checkout.tax')}:</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">{t('checkout.shipping')}:</span>
              <span className="font-semibold text-green-600">{t('checkout.free')}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-lg font-bold text-gray-900">{t('checkout.total')}:</span>
              <span className="text-lg font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {t('checkout.paymentMethod')}
              </h3>

              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                  />
                  <span className="ml-3 font-medium">{t('checkout.bank')}</span>
                  <div className="ml-auto flex gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="Visa"
                      className="h-6"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                      alt="Mastercard"
                      className="h-6"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                      alt="PayPal"
                      className="h-6"
                    />
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                  />
                  <span className="ml-3 font-medium">{t('checkout.cash')}</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={t('checkout.couponCode')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                >
                  {t('checkout.applyCoupon')}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mb-4"
            >
              {t('checkout.placeOrder')}
            </button>

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
                {t('checkout.securePayment')}
              </div>
              <p className="text-xs text-gray-400">
                {t('checkout.ssl')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
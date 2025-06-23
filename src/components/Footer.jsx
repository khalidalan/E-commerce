import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white pt-16 ">
      <div className="container !px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold inter">{t("footer.exclusive")}</h3>
            <div className="space-y-4">
              <h4 className="text-xl font-medium">{t("footer.subscribe")}</h4>
              <p className="text-gray-300">{t("footer.subscribeOffer")}</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t("footer.enterEmail")}
                  className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">{t("footer.support")}</h3>
            <div className="space-y-4 text-gray-300">
              <p>{t("footer.address")}</p>
              <p>{t("footer.email")}</p>
              <p>{t("footer.phone")}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">{t("footer.account")}</h3>
            <div className="space-y-3">
              <Link to="/account" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.myAccount")}
              </Link>
              <Link to="/login" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.loginRegister")}
              </Link>
              <Link to="/cart" className="block text-gray-300 hover:text-white transition-colors">
                {t("navigation.cart")}
              </Link>
              <Link to="/wishlist" className="block text-gray-300 hover:text-white transition-colors">
                {t("navigation.wishlist")}
              </Link>
              <Link to="/products" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.shop")}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">{t("footer.quickLink")}</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.termsOfUse")}
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-white transition-colors">
                {t("footer.faq")}
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                {t("navigation.contact")}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">{t("footer.downloadApp")}</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">{t("footer.appOffer")}</p>

              <div className="flex gap-3">
                <img src="/public/Frame 719.png" alt="" />
              </div>

              <div className="flex gap-6 pt-4">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <img src="/public/socialMediaIcon/Icon-Facebook.svg" alt="" />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <img src="/public/socialMediaIcon/Icon-Twitter.svg" alt="" />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <img src="/public/socialMediaIcon/icon-instagram.svg" alt="" />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <img src="/public/socialMediaIcon/Icon-Linkedin.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 pb-6 text-center">
          <p className="text-gray-500">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

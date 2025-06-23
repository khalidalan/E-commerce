import { Link } from "react-router-dom";
import Timer2 from "./Timer2";
import productsData from "./productsData";
import { useTranslation } from "react-i18next";

function Discount() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden mt-16 mb-16" dir="ltr">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div className="container  px-4 sm:px-6 lg:px-8 !py-10 sm:py-16 lg:py-20 ">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-block bg-green-400/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-green-400/30">
              {t("musicOffer.limitedTimeOffer")}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t("musicOffer.enhanceMusic")}
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {t("musicOffer.musicExperience")}
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
              {t("musicOffer.premiumSound")}
            </p>

            <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 max-w-md mx-auto lg:mx-0">
              <Timer2 />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={`/product/${productsData[10].id}`}>
                <button className="group relative bg-gradient-to-r from-green-400 to-green-500 text-black font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/50 active:scale-95">
                  <span className="relative z-10">{t("musicOffer.buyNow")}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-500"></div>

            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[250px] sm:min-h-[300px]">
              <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
              <div className="relative z-10 flex justify-center items-center">
                <img
                  className="w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[400px] h-auto object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  src="/JBL_BOOMBOX.webp"
                  alt="JBL Boombox Premium Speaker"
                />
              </div>

              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                -25%
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-4 border-2 border-green-400/20 rounded-full animate-ping delay-300"></div>
                <div className="absolute inset-8 border-2 border-green-400/10 rounded-full animate-ping delay-700"></div>
              </div>
            </div>

            <div className="absolute -left-4 top-1/4 bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-xl p-3 text-white text-sm transform -rotate-6 hidden lg:block">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>{t("musicOffer.bassBoost")}</span>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-black/80 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3 text-white text-sm transform rotate-6 hidden lg:block">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>{t("musicOffer.sound360")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;

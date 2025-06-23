import { Link } from "react-router-dom";
import BlueBlock from "./BlueBlock";
import Title from "./Title";
import productsData from "./productsData";
import { useTranslation } from "react-i18next";

function Featured() {
  const { t } = useTranslation();
  return (
    <div className="relative container mx-auto mt-36 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 mb-12">
        <BlueBlock title={t("products.featured")} />
        <Title title={t("products.newArrival")} />
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 h-auto lg:h-[500px]">
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-gray-900 via-black to-purple-900 rounded-2xl relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 h-64 sm:h-80 lg:h-full">
          <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300"></div>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
              <img
                src="/playstation.webp"
                alt="PlayStation 5"
                className="w-40 sm:w-48 lg:w-56 h-auto filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white z-20">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-3 lg:p-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {t("products.playstation5")}
              </h3>
              <p className="text-gray-300 mb-3 text-xs sm:text-sm leading-relaxed">
                {t("products.ps5Description")}
              </p>
              <Link to={`/product/${productsData[6].id}`}>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transform transition-all duration-300 hover:scale-105">
                  {t("promotions.shopNow")} 🎮
                </button>
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        </div>

        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-1 bg-gradient-to-r from-pink-900 via-rose-900 to-purple-900 rounded-2xl relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 h-48 lg:h-auto">
          <div className="absolute top-2 left-2 w-1 h-1 bg-pink-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-rose-300 rounded-full animate-twinkle delay-500"></div>

          <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2">
            <div className="relative transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2">
              <img
                src="/womenCollections.webp"
                alt="Women's Collections"
                className="w-32 sm:w-40 lg:w-48 h-auto filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white z-10 max-w-[50%]">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4">
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
               {t("products.womenCollections")} 
              </h3>
              <p className="text-gray-300 mb-3 text-xs sm:text-sm">
                {t("products.womenDescription")}
              </p>
              <Link to={`/product/${productsData[7].id}`}>
                <button className="bg-gradient-to-r from-pink-600 to-rose-600 px-3 py-1.5 rounded-full text-xs font-semibold transform transition-all duration-300 hover:scale-105">
                  {t("promotions.shopNow")} 👗
                </button>
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 rounded-2xl relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 h-48 lg:h-auto">
          <div className="absolute top-2 right-2">
            <div className="w-4 h-4 border border-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute inset-1 border border-cyan-400/50 rounded-full animate-ping delay-300"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
              <img
                src="/speakers.webp"
                alt="Speakers"
                className="w-20 sm:w-24 lg:w-28 h-auto filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white z-10">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-3">
              <h3 className="text-sm sm:text-base font-bold mb-1 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
               {t("products.speakers")}
              </h3>
              <p className="text-gray-300 text-xs mb-2">
                {t("products.speakersDescription")}
              </p>
              <Link to={`/product/${productsData[8].id}`}>
                <button className="bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 rounded-full text-xs font-semibold transform transition-all duration-300 hover:scale-105">
                  {t("promotions.shopNow")} 🔊
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 rounded-2xl relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 h-48 lg:h-auto">
          <div className="absolute top-2 right-2 w-1 h-1 bg-amber-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-twinkle delay-300"></div>

          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative transform transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2">
              <img
                src="/perfume.webp"
                alt="Perfume"
                className="w-16 sm:w-20 lg:w-24 h-auto filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white z-10">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-3">
              <h3 className="text-sm sm:text-base font-bold mb-1 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                {t("products.perfume")}
              </h3>
              <p className="text-gray-300 text-xs mb-2">
                {t("products.perfumeDescription")}
              </p>
              <Link to={`/product/${productsData[9].id}`}>
                <button className="bg-gradient-to-r from-amber-600 to-yellow-600 px-3 py-1 rounded-full text-xs font-semibold transform transition-all duration-300 hover:scale-105">
                  {t("promotions.shopNow")} 🌸
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Featured;

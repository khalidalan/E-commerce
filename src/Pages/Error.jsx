import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import { useTranslation } from "react-i18next";

function Error() {
  const { t } = useTranslation();

  return (
    <>
      <TopHeader />
      <Header />

      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold inter">
          {t("errorPage.title")}
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-600 max-w-md">
          {t("errorPage.description")}
        </p>

        <Link to="/" className="mt-10 sm:mt-14">
          <button className="bg-blue-600 text-white px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out active:scale-95">
            {t("errorPage.backToHome")}
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default Error;

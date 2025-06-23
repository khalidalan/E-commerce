import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AllProducts() {
  const { t } = useTranslation();


  return (
    <Link to="/products" className="container flex flex-col items-center">
      <button className="bg-blue-600 text-white px-4 md:max-w-fit  font-medium py-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out  mx-auto w-full mt-16 active:scale-95">
        {t("flashSales.viewAllProducts")}
      </button>
    </Link>
  );
}

export default AllProducts;

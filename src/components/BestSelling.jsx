import { Link } from "react-router-dom";
import BlueBlock from "./BlueBlock";
import Cards from "./Cards";
import Title from "./Title";
import Products from "../components/AllProducts1"; 
import { useTranslation } from "react-i18next";
const products = Products; 



const cards = products.slice(8, 13);     
function BestSelling() {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col gap-6 ">
      <div className="flex  items-center justify-between">
        <div className="flex flex-col gap-6">
          <BlueBlock title={t("bestSelling.thisMonth")} />
          <Title title={t("bestSelling.bestSellingProducts")} />
        </div>
        <Link to="/products">
          <button className="bg-blue-600 text-white xl:px-12 px-4 text-nowrap md:block hidden  font-medium py-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out  mt-8   active:scale-95">
            {t("bestSelling.viewAll")}
          </button>
        </Link>
      </div>
      <div className="mt-6"></div>
      <Cards products={cards} />
    </div>
  );
}

export default BestSelling;

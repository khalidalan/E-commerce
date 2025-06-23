import AllProducts from "./AllProducts";
import BlueBlock from "./BlueBlock";
import Sales from "./Sales";
import Timer from "./Timer";
import Products from "../components/AllProducts1"; 
const products = Products; 

import { useTranslation } from "react-i18next";



function Section() {
  const { t } = useTranslation();
  const flashSales = products.slice(0, 8);
  return (
    <div className="flex flex-col container gap-6 xl:!mt-20 !mt-8 ">
      <BlueBlock title={t("flashSales.todays")} />
      <Timer />
      <Sales products={flashSales} />

      <AllProducts />
    </div>
  );
}

export default Section;

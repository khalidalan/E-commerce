import AllProducts from "./AllProducts";
import BlueBlock from "./BlueBlock";
import Cards2 from "./Cards2";
import Title from "./Title";
import Products from "../components/AllProducts1";
import { useTranslation } from "react-i18next";
const products = Products;

function OurProducts() {
  const { t } = useTranslation();
  const cards2 = products.slice(13, 23);

  return (
    <div className="flex flex-col container mx-auto my-16 gap-5 ">
      <BlueBlock title={t("products.ourProducts")} />
      <Title title={t("products.exploreProducts")} />

      <Cards2 products={cards2} />

      <AllProducts />
    </div>
  );
}

export default OurProducts;

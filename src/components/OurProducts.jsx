import AllProducts from "./AllProducts";
import BlueBlock from "./BlueBlock";
import Cards2 from "./Cards2";
import Title from "./Title";

function OurProducts() {
  return (
    <div className="flex flex-col container mx-auto my-16 gap-5 ">
      <BlueBlock title="Our Products" />
      <Title title="Explore Our Products" />

      <Cards2 />

      <AllProducts />
    </div>
  );
}

export default OurProducts;

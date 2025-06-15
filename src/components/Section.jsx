import AllProducts from "./AllProducts";
import BlueBlock from "./BlueBlock";
import Sales from "./Sales";
import Timer from "./Timer";
function Section() {
  return (
    <div className="flex flex-col container gap-6 xl:!mt-20 !mt-8 ">
      <BlueBlock title="Today's" />
      <Timer />
      <Sales />

      <AllProducts />
    </div>
  );
}

export default Section;

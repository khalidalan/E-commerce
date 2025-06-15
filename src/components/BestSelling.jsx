import BlueBlock from "./BlueBlock";
import Cards from "./Cards";
import Title from "./Title";

function BestSelling() {
  return (
    <div className="container flex flex-col gap-6 ">
      <div className="flex  items-center justify-between">
        <div className="flex flex-col gap-6">
          <BlueBlock title="This Month" />
          <Title title="Best Selling Products" />
        </div>

        <button className="bg-blue-600 text-white xl:px-12 px-4 text-nowrap md:block hidden  font-medium py-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out  mt-8   active:scale-95">
          View All
        </button>
      </div>

      <Cards />
    </div>
  );
}

export default BestSelling;

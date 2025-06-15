import BlueBlock from "../components/BlueBlock";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";

function WishList() {
  return (
    <div>
      <TopHeader />
      <Header />

      <div className="flex container justify-between items-center pt-20  !my-12">
        <p>Wishlist (4)</p>

        <button className="px-6 xl:px-12 xl:py-4 py-2 border border-gray-600 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out rounded">
          Move all to cart
        </button>
      </div>

      <div className="container">
        <Cards />
      </div>

      <div className=" pt-20 pb-16">
        <BlueBlock title="Just For You" />
        <div className="pt-16 pb-36 container">
          <Cards />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WishList;

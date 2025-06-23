import Advantages from "../components/Advantages";
import BestSelling from "../components/BestSelling";
import CategorySection from "../components/CategorySection";
import Discount from "../components/Discount";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import OurProducts from "../components/OurProducts";
import Section from "../components/Section";
import TopHeader from "../components/TopHeader";

function Home() {

  return (
    <>
      <TopHeader />
      <Header />
      <Hero />
      <Section />
      <hr className="!my-16 container mx-auto opacity-15  " />
      <CategorySection />
      <hr className="!my-16 container mx-auto opacity-15  " />
      <BestSelling />
      <Discount />
      <OurProducts />
      <div className="xl:mt-26 mt-20 "></div>
      <Featured />
      <div className="xl:mt-36 mt-20"></div>
      <Advantages />
      <div className="xl:mb-36 mt-20"></div>
      <Footer />
    </>
  );
}

export default Home;


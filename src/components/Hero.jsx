import Aside from "./Aside";
import Slider from "./Slider";

function Hero() {

  return (
    <div className="container grid grid-cols-8 " dir="ltr">
      <div className="xl:col-span-1 xl:flex">
        <Aside />
      </div>
      <div className="xl:col-span-7 col-span-8">
        <Slider />
      </div>
    </div>
  );
}

export default Hero;

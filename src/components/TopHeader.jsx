function TopHeader() {
  return (
    <div className="flex md:flex-row flex-col  justify-center items-center bg-black text-white p-4 text-sm sticky z-60 top-0">
      <p className="xl:text-base md:text-xs text-[10px] ">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
      </p>{" "}
      <span className="w-2"></span>
      <a href="#" className="underline font-semibold">
        ShopNow
      </a>
    </div>
  );
}

export default TopHeader;

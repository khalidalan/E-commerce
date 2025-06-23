import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

function TopHeader() {
  const { t } = useTranslation();
  return (
    <div className="flex md:flex-row flex-col  justify-center items-center bg-black text-white p-4 text-sm sticky z-60 top-0">
      <p className="xl:text-base md:text-xs text-[9px] ">
        {t("banner.summerSale")}
      </p>{" "}
      <span className="w-2"></span>
      <Link to={"/products"} className="underline font-semibold">
        {t("banner.shopNow")}
      </Link>
    </div>
  );
}

export default TopHeader;

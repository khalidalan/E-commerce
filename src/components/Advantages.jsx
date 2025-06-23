import { useTranslation } from "react-i18next";

function Advantages() {
  const { t } = useTranslation();

  return (
    <div className="flex lg:flex-row flex-col gap-20 justify-center items-center xl:my-12 text-center">
      <div className="flex flex-col items-center ">
        <img
          src="/public/icons/E Commerce Website ِAlmdrasa (1)/Services.svg"
          alt=""
        />
        <p className="text-xl font-semibold mt-6">
          {t("services.freeDelivery")}
        </p>
        <p className="text-sm mt-2 ">
          {t("services.freeDeliveryDesc")}
        </p>
      </div>

      <div className="flex flex-col items-center ">
        <img
          src="/public/icons/E Commerce Website ِAlmdrasa (1)/Services (1).svg"
          alt=""
        />
        <p className="text-xl font-semibold mt-6">
          {t("services.customerService")}
        </p>
        <p className="text-sm mt-2 ">
          {t("services.customerServiceDesc")}
        </p>
      </div>

      <div className="flex flex-col items-center ">
        <img
          src="/public/icons/E Commerce Website ِAlmdrasa (1)/Services-1.svg"
          alt=""
        />
        <p className="text-xl font-semibold mt-6">
          {t("services.moneyBack")}
        </p>
        <p className="text-sm mt-2 ">
          {t("services.moneyBackDesc")}
        </p>
      </div>
    </div>
  );
}


export default Advantages;

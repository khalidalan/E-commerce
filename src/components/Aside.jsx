import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Aside() {
  const {  t } = useTranslation();
  return (
    <ul className="hidden flex-col gap-4 container  lg:!py-5 border-r xl:flex border-gray-200">
      {[
        t("categories.womenFashion"),
        t("categories.menFashion"),
        t("categories.electronics"),
        t("categories.homeLiving"),
        t("categories.sportsOutdoor"),
        t("categories.babyToys"),
        t("categories.medicine"),
        t("categories.groceriesPets"),
        t("categories.healthBeauty"),
      ].map((item, index) => (
        <li key={index}>
          <Link
            to={"/products"}
            className="block text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-600 hover:translate-x-1"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Aside;

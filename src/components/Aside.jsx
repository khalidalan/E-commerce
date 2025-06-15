import React from "react";

function Aside() {
  return (
    <ul className="hidden flex-col gap-4 container  lg:!py-5 border-r xl:flex border-gray-200">
      {[
        "Woman's Fashion",
        "Men's Fashion",
        "Electronics",
        "Home & Living",
        "Medicine",
        "Sports & Outdoor",
        "Baby's & Toys",
        "Groceries & Pets",
        "Health & Beauty",
      ].map((item, index) => (
        <li key={index}>
          <a
            href="#"
            className="block text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-600 hover:translate-x-1"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Aside;

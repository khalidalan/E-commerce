import BlueBlock from "./BlueBlock";
import Categories from "./Categories";
import Title from "./Title";
import { useTranslation } from "react-i18next";

function CategorySection() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col container gap-6">
      <BlueBlock title={t("categories.categories")} />
      <Title title={t("categories.browseByCategory")} />

      <Categories />
    </div>
  );
}

export default CategorySection;

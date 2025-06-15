import BlueBlock from "./BlueBlock";
import Categories from "./Categories";
import Title from "./Title";

function CategorySection() {
  return (
    <div className="flex flex-col container gap-6">
      <BlueBlock title="Category" />
      <Title title="Browse By Category" />

      <Categories />
    </div>
  );
}

export default CategorySection;

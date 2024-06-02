/* eslint-disable react/prop-types */
import Category from "./Category";
import Price from "./Price";

function SideBar({ onFilterChange, categoriesServer }) {
  return (
    <div className="w-full flex flex-col gap-4 pr-2">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Filters</h2>
      </div>
      <Category
        onFilterChange={onFilterChange}
        categoriesServer={categoriesServer}
      />
      <Price onFilterChange={onFilterChange} />
    </div>
  );
}

export default SideBar;

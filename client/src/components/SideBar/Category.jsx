/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getDataFromServer } from "../../utils/getDataFromServer";

function Category({ onFilterChange, categoriesServer }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await getDataFromServer("/categories");
    //     setCategories(data);
    //   } catch (error) {
    //     alert("Error occured", error);
    //   }
    // };

    setCategories(categoriesServer);

    // fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    onFilterChange(value, checked, "category");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3">Shop by category</h2>
      <div className="mt-4">
        <ul className="flex flex-col gap-2.5 text-sm lg:text-base text-gray-750">
          {categories.map((item) => (
            <li
              key={item.id}
              className="border-b-[1px] pb-2 flex items-center gap-2 hover:text-secondary hover:border-secondary duration-300"
            >
              <input
                type="checkbox"
                id={item.id}
                value={item.name}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;

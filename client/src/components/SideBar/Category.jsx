/* eslint-disable react/prop-types */
const category = [
  {
    _id: 9006,
    title: "sneakers",
  },
  {
    _id: 9007,
    title: "heels",
  },
  {
    _id: 9008,
    title: "sandals",
  },
  {
    _id: 9009,
    title: "else",
  },
];

function Category({ onFilterChange }) {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    onFilterChange(value, checked, "category");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3">Shop by category</h2>
      <div className="mt-4">
        <ul className="flex flex-col gap-2.5 text-sm lg:text-base text-gray-750">
          {category.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] pb-2 flex items-center gap-2 hover:text-secondary hover:border-secondary duration-300"
            >
              <input
                type="checkbox"
                id={item._id}
                value={item.title}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item._id}>{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;

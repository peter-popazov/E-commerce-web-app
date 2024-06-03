/* eslint-disable react/prop-types */
const priceList = [
  {
    _id: 950,
    priceOne: 0.0,
    priceTwo: 49.99,
  },
  {
    _id: 951,
    priceOne: 50.0,
    priceTwo: 99.99,
  },
  {
    _id: 952,
    priceOne: 100.0,
    priceTwo: 199.99,
  },
  {
    _id: 953,
    priceOne: 200.0,
    priceTwo: 399.99,
  },
  {
    _id: 954,
    priceOne: 400.0,
    priceTwo: 599.99,
  },
  {
    _id: 955,
    priceOne: 600.0,
    priceTwo: 1000.0,
  },
];

function Price({ onFilterChange }) {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    onFilterChange(value, checked, "price");
  };

  return (
    <div className="cursor-pointer">
      <h2 className="text-xl font-bold mb-3">Shop by price</h2>
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-2 hover:text-secondary hover:border-secondary duration-300"
            >
              <input
                id={item._id}
                type="checkbox"
                value={`${item.priceOne}-${item.priceTwo}`}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item._id}>
                ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Price;

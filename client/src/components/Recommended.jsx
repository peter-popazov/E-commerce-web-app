/* eslint-disable react/prop-types */

import Button from "./shared/Button";

function Recommended({ onButtonClick, brands }) {
  return (
    <>
      <h2 className="text-3xl font-bold m-2">Recommended Filters</h2>
      <div className="flex gap-3 mb-5">
        {brands.map((brand) => (
          <Button
            key={brand}
            value={brand}
            onButtonClick={onButtonClick}
            bgColor={"bg-primaryLight"}
            textColor={"text-white"}
            rounded={"rounded-xl"}
          >
            {brand}
          </Button>
        ))}
      </div>
    </>
  );
}

export default Recommended;

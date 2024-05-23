/* eslint-disable react/prop-types */

import Button from "./shared/Button";
import { recommendedButtonsFilter } from "../constants/constants";

function Recommended({ onButtonClick }) {
  return (
    <>
      <h2 className="text-3xl font-bold m-2">Recommended</h2>
      <div className="flex gap-3 mb-5">
        {recommendedButtonsFilter.map((brand) => (
          <Button
            key={brand}
            value={brand}
            onButtonClick={onButtonClick}
            bgColor={"bg-secondary"}
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

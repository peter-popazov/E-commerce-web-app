/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./shared/Button";

function CTA() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="container px-4 my-24 ">
      <div
        className="text-white grid xl:grid-cols-2 grid-cols-1  justify-between sm:items-center gap-5 md:gap-2 rounded-3xl px-10 py-7 my-12 
      bg-brandBlue dark:bg-blue-950"
      >
        <div>
          <h3 className="lg:text-4xl text-3xl md:mb-0 mb-0 lg:leading-normal font-bold">
            Unlock exclusive discounts by signing up today and become part of
            our loyal customer community
          </h3>
          <p className="mt-2 font-semibold">
            Subscribe to our blog and get discount on your first order up to
            <span className="font-semibold"> 20&#37;</span>.
          </p>
        </div>
        <Form
          selectedOption={selectedOption}
          onSelectedChange={handleSelectChange}
        />
      </div>
    </section>
  );
}

function Form({ selectedOption, onSelectedChange }) {
  return (
    <form className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="userEmail" className="font-semibold">
          Email
        </label>
        <input
          id="userEmail"
          type="email"
          placeholder="example@example.com"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="informationSource" className="font-semibold">
          Where did you hear about us?
        </label>
        <select
          id="informationSource"
          value={selectedOption}
          onChange={onSelectedChange}
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
        >
          <option value="" disabled>
            Please select
          </option>
          <option value="Social Media">Social Media</option>
          <option value="Word of Mouth">Word of Mouth</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Advertisement">Advertisement</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="surname" className="font-semibold">
          Surname
        </label>
        <input
          id="surname"
          type="text"
          placeholder="Doe"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
        />
      </div>
      <div className="md:col-span-2 flex justify-center mt-4">
        <Button bgColor="bg-primary" textColor="white">
          Get Now
        </Button>
      </div>
    </form>
  );
}

export default CTA;

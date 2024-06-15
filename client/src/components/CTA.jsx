/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "./shared/Button";
import { API_BASE_URL } from "../constants/constants";

function CTA() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    email: "",
    sourceInfo: selectedOption,
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.sourceInfo) {
      newErrors.sourceInfo = "Information source is required";
    }
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post(API_BASE_URL + "/cta", formData)
        .then(() => {
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <section className="container px-4 my-24">
      <div className="text-white grid xl:grid-cols-2 grid-cols-1 justify-between sm:items-center gap-5 md:gap-2 rounded-3xl sm:px-10 px-7 py-7 my-12 bg-brandBlue dark:bg-blue-950">
        <div>
          <h3 className="lg:text-4xl md:text-3xl text-2xl md:mb-0 mb-0 lg:leading-normal font-bold">
            Unlock exclusive discounts by signing up today and become part of
            our loyal customer community
          </h3>
          <p className="mt-4 font-semibold">
            Subscribe to our blog and get discount on your first order up to
            <span className="font-semibold"> 20&#37;</span>.
          </p>
        </div>
        <Form
          formData={formData}
          onSelectedChange={handleSelectChange}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      </div>

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-20 right-0 bg-brandGreen text-white p-4 rounded-lg"
        >
          <p className="text-md">Thank you for sumbitting the form!</p>
          <p className="font-semibold mb-2">Chck your email!</p>
          <Button
            onButtonClick={() => handleCloseSuccessMessage()}
            bgColor="bg-white"
            textColor="text-brandGreen"
            rounded={"rounded-2xl"}
          >
            Close
          </Button>
        </motion.div>
      )}
    </section>
  );
}

function Form({
  formData,
  onSelectedChange,
  handleSubmit,
  handleInputChange,
  errors,
}) {
  return (
    <form
      className="grid md:grid-cols-2 grid-cols-1 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 dark:text-gray-400">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && (
          <span className="text-gray-900 font-bold">{errors.email}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="sourceInfo" className="font-semibold">
          Where did you hear about us?
        </label>
        <select
          id="sourceInfo"
          value={formData.sourceInfo}
          onChange={(e) => {
            handleInputChange(e);
            onSelectedChange(e);
          }}
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
        {errors.sourceInfo && (
          <span className="text-gray-900 font-bold">{errors.sourceInfo}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="font-semibold">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="John"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && (
          <span className="text-gray-900 font-bold">{errors.firstName}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="font-semibold">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Doe"
          className="text-gray-800 w-full py-2.5 px-2 focus:outline-none rounded-lg"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && (
          <span className="text-gray-900 font-bold">{errors.lastName}</span>
        )}
      </div>
      <div className="md:col-span-2 flex justify-center mt-4">
        <Button bgColor="bg-primary" textColor="white" type="submit">
          Get Now
        </Button>
      </div>
    </form>
  );
}

export default CTA;

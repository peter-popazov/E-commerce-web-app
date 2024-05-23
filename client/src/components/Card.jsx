/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function Card({ img, title, reviews, newPrice }) {
  return (
    <div className="flex flex-col justify-between w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={""}>
        <img
          src={img}
          alt={title}
          className="w-full h-52 object-cover p-8 rounded-t-lg"
        />
      </Link>
      <div className="flex-grow px-5 pb-5">
        <Link to={""}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <AiFillStar className="text-yellow-400" />
            <AiFillStar className="text-yellow-400" />
            <AiFillStar className="text-yellow-400" />
            <AiFillStar className="text-yellow-400" />
            <AiFillStar className="text-yellow-400" />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {reviews}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${newPrice}
          </span>
          <Link
            to="#"
            className="text-white hover:bg-brandBlue bg-brandBlue/90 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

/* eslint-disable react/prop-types */
import { FaCaretDown } from "react-icons/fa";
import { quickLinks } from "../../constants/links";

export function QuickLinks() {
  return (
    <li className="relative hidden sm:block cursor-pointer group">
      <a
        href="#"
        className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
      >
        QuickLinks
        <span>
          <FaCaretDown className="group-hover:rotate-180 duration-300" />
        </span>
      </a>
      <div
        className="absolute z-[9999] hidden group-hover:block w-[200px] 
      rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white "
      >
        <ul className="space-y-2 z-[9999]">
          {quickLinks.map((data, i) => (
            <DropDownMenuLinks data={data} key={i} />
          ))}
        </ul>
      </div>
    </li>
  );
}

function DropDownMenuLinks({ data }) {
  return (
    <li>
      <a
        className="text-gray-500 hover:text-black dark:hover:text-white transition-all 
        duration-200 p-2 inline-block w-full hover:bg-primary/20 z-[9999]"
        href={data.link}
      >
        {data.name}
      </a>
    </li>
  );
}

export default QuickLinks;

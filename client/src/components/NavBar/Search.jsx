import { IoMdSearch } from "react-icons/io";

function Search() {
  return (
    <div className="flex group justify-between items-center gap-4">
      <input type="text" placeholder="Search" className="search-bar" />
      <IoMdSearch
        className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400
              right-3 duration-200"
      />
    </div>
  );
}

export default Search;

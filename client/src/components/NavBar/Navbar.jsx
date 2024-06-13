/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import QuickLinks from "./QuickLinks";
import { links } from "../../constants/links";
import Logo from "../shared/Logo";

function Navbar() {
  return (
    <header
      className="bg-white dark:bg-gray-900 dark:text-white
    duration-200 relative z-40 mb-4"
    >
      <div className="py-4 mx-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo />
            <nav>
              <ul className="flex items-center gap-4">
                {links.map((data, i) => (
                  <NavLink key={i} info={data} />
                ))}
                <QuickLinks />
              </ul>
            </nav>
          </div>
          <div className="flex justify-between items-center gap-4">
            <DarkMode />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ info }) {
  return (
    <li>
      <Link to={info.to} className="link">
        {info.name}
      </Link>
    </li>
  );
}

export default Navbar;

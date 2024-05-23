/* eslint-disable react/prop-types */
import Logo from "./shared/Logo";
import { links } from "../constants/links";
import { quickLinks } from "../constants/links";

const currentYear = new Date(Date.now()).getFullYear();

function Footer() {
  return (
    <footer className="container mt-20 mb-16">
      <nav className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4">
            <span> &copy;</span> Copyright <span>{currentYear}</span>
          </p>
        </div>
        <Item links={links} title="Important" />
        <Item links={quickLinks} title="Quick Links" />
        <Item links={quickLinks} title="Address">
          <p>Street, building, Number</p>
        </Item>
      </nav>
    </footer>
  );
}
function Item({ title, links, children }) {
  return (
    <>
      {children ? (
        <div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          {children}
        </div>
      ) : (
        <ul>
          <h3 className="mb-3 text-xl font-bold">{title}</h3>
          {links.map((link) => (
            <li key={link.id}>
              <a
                className="inline-block text-gray-700 hover:text-black dark:hover:text-white duration-200 mb-2"
                href={link.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Footer;

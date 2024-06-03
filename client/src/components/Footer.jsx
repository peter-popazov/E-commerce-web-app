/* eslint-disable react/prop-types */
import Logo from "./shared/Logo";
import { links } from "../constants/links";
import { quickLinks } from "../constants/links";

const currentYear = new Date(Date.now()).getFullYear();

function Footer() {
  return (
    <footer className="mt-20 px-8 sm:px-16 bg-gray-100 py-16 sm:py-22 dark:bg-gray-800">
      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center sm:text-start">
        <div>
          <Logo />
          <p className="mt-4 dark:text-gray-400">
            <span> &copy;</span> Copyright <span>{currentYear}</span>
          </p>
        </div>
        <FooterItem links={links} title="Important" />
        <FooterItem links={quickLinks} title="Quick Links" />
        <FooterItem links={quickLinks} title="Address">
          <p>Street, building, Number</p>
        </FooterItem>
      </nav>
    </footer>
  );
}

function FooterItem({ title, links, children }) {
  return (
    <>
      {children ? (
        <div className="dark:text-gray-400">
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          {children}
        </div>
      ) : (
        <ul className="dark:text-gray-400">
          <h3 className="mb-3 text-xl font-bold">{title}</h3>
          {links.map((link) => (
            <li key={link.id}>
              <a
                className="inline-block text-gray-700 hover:text-black dark:hover:text-white dark:text-gray-400 duration-200 mb-2"
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

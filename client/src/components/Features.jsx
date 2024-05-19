/* eslint-disable react/prop-types */
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaTruckRampBox } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";

const features = [
  {
    id: 1,
    icon: (
      <RiDiscountPercentFill className="text-4xl md:text-5xl text-primary" />
    ),
    title: "Lowest Prices",
    descriprion: "Try to find lower prices and we`ll make a discount for you",
  },
  {
    id: 2,
    icon: <MdDiscount className="text-4xl md:text-5xl text-primary" />,
    title: "Loyalty Programs",
    descriprion:
      "We reward loyal customers with exclusive benefits, discounts, etc.",
  },
  {
    id: 3,
    icon: <FaTruckRampBox className="text-4xl md:text-5xl text-primary" />,
    title: "Free Sheeping",
    descriprion: "We provide various shipping options, including free ones",
  },
  {
    id: 4,
    icon: <FaCalendarDays className="text-4xl md:text-5xl text-primary" />,
    title: "14 Days of Safe Return",
    descriprion: "You have 14 days to return a purchase and get a full refund",
  },
];

function Features() {
  return (
    <section className="container px-4 mt-12 md:mt-18">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
        {features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </ul>
    </section>
  );
}

function Feature({ feature }) {
  return (
    <li className="flex flex-col items-start sm:flex-row gap-4">
      {feature.icon}
      <div>
        <h3 className="lg:text-xl font-bold mb-2">{feature.title}</h3>
        <p className="text-gray-500 text-sm">{feature.descriprion}</p>
      </div>
    </li>
  );
}

export default Features;

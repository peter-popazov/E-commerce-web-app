/* eslint-disable react/prop-types */
import Button from "./shared/Button";
import AirPodsPro from "/img/cards/airPodsPro.jpg";
import AppleWatch from "/img/cards/appleWatch.jpeg";
import HomePod from "/img/cards/homePod.jpg";
import MacBook from "/img/cards/macBook.jpg";
import PS5 from "/img/cards/ps5.png";
import ManAppleVisionPro from "/img/cards/manAppleVisionPro.jpg";
import { Link } from "react-router-dom";

const cardsDataRow1 = [
  {
    heading: "Listen",
    subHeading: "With",
    product: "AirPods Pro",
    img: AirPodsPro,
    styling: {
      gridSpan: "",
      imageSize: "80px",
      buttonBgColor: "bg-primary",
      buttonTextColor: "text-white",
      headingTextColor: "gray-400",
      gradient: "bg-gradient-to-br from-black/90 to-black/70",
    },
  },
  {
    heading: "Track Activity",
    subHeading: "With",
    product: "Watch",
    styling: {
      gridSpan: "",
      imageSize: "130px",
      buttonBgColor: "bg-white",
      buttonTextColor: "text-black",
      gradient: "bg-gradient-to-br from-brandBlue/95 to-brandBlue/75",
    },
    img: AppleWatch,
  },
  {
    heading: "Be Productive",
    subHeading: "With",
    product: "MacBook Pro",
    img: MacBook,
    styling: {
      gridSpan: "sm:col-span-2",
      imageSize: "280px",
      buttonBgColor: "bg-white",
      buttonTextColor: "text-primary",
      gradient: "bg-gradient-to-br from-primary to-primary/90",
    },
  },
];

const cardsDataRow2 = [
  {
    heading: "Dive Into VR",
    subHeading: "With",
    product: "Vision Pro",
    styling: {
      gridSpan: "sm:col-span-2",
      imageSize: "120px",
      buttonBgColor: "bg-white",
      buttonTextColor: "text-black",
      gradient: "bg-gradient-to-br from-gray-600/90 to-gray-200",
    },
    img: ManAppleVisionPro,
  },
  {
    heading: "Play",
    subHeading: "With",
    product: "Play Station5",
    styling: {
      gridSpan: "",
      imageSize: "10px",
      buttonBgColor: "bg-white",
      buttonTextColor: "text-black",
      gradient: "bg-gradient-to-br from-brandGreen/90 to-brandGreen/70",
    },
    img: PS5,
  },
  {
    heading: "Listen",
    subHeading: "With",
    product: "Home Pod",
    img: HomePod,
    styling: {
      gridSpan: "",
      imageSize: "100px",
      buttonBgColor: "bg-white",
      buttonTextColor: "text-brandYellow",
      headingTextColor: "white",
      gradient: "bg-gradient-to-br from-brandYellow to-brandYellow/90",
    },
  },
];

function Cards() {
  return (
    <main className="my-12">
      <div className="container px-4">
        <CardRow cardData={cardsDataRow1} />
        <CardRow cardData={cardsDataRow2} />
      </div>
    </main>
  );
}

function CardRow({ cardData }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
      {cardData.map((data, i) => (
        <Card key={i} data={data} />
      ))}
    </div>
  );
}

function Card({ data }) {
  return (
    <div
      className={`${data.styling.gradient} ${data.styling.gridSpan} py-10 pl-5 text-white rounded-3xl 
    h-[320px] relative flex items-center justify-between`}
    >
      <div className="mb-4">
        <p className={`mb-[2px] text-${data.styling.headingTextColor}`}>
          {data.heading}
        </p>
        <p className="text-xl xl:text-2xl font-semibold mb-[2px] z-0">{data.subHeading}</p>
        <p className="text-3xl xl:text-5xl font-bold opacity-30 mb-2">
          {data.product}
        </p>
        <Link to={"/products"}>
          <Button
            bgColor={data.styling.buttonBgColor}
            textColor={data.styling.buttonTextColor}
          >
            Buy Now
          </Button>
        </Link>
      </div>
      <img
        src={data.img}
        alt={data.product}
        className={`z-10 ${
          data.product === "Vision Pro" ? "md:w-[300px] w-[100%]" : ""
        } sm:max-w-[60%] md:max-w-[60%] lg:max-w-[40%] max-w-[50%]`}
      />
    </div>
  );
}

export default Cards;

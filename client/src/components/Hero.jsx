/* eslint-disable react/prop-types */
import Slider from "react-slick";
import AppleVision from "/img/hero/appleVisionPro.png";
import iPhone from "/img/hero/iPhone.jpg";
import AirPodsMax from "/img/hero/AirPodsMax.png";

const heroSlide = [
  {
    id: 1,
    img: AppleVision,
    brand: "Apple",
    title: "Apple Vision Pro",
    feature: "Virtail Reality",
    description:
      "Experience a new dimension with the Apple Vision Pro, an augmented reality headset that brings digital experiences to life in your surroundings.",
  },
  {
    id: 2,
    img: iPhone,
    brand: "Apple",
    title: "iPhone 15 Pro",
    feature: "Amazing camera",
    description:
      "The iPhone 15 Pro features an advanced camera system, powerful performance, and a sleek design, making it the ultimate smartphone for all your needs.",
  },
  {
    id: 3,
    img: AirPodsMax,
    brand: "Apple",
    title: "AirPods Max",
    feature: "Incredible sound",
    description:
      "Immerse yourself in high-fidelity audio with the AirPods Max, combining exceptional sound quality with industry-leading noise cancellation.",
  },
];

function Hero() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 200,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <section className="container px-4">
      <div
        className="overflow-hidden rounded-3xl min-h-[550px]
          sm:min-h-[650px] hero-bg-color flex justify-center 
          items-center"
      >
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {heroSlide.map((product) => (
              <Slide key={product.id} product={product} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

function Slide({ product }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div
        className="flex flex-col justify-center gap-4 sm:pl-3
      pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1
      relative z-10"
      >
        <h2 className="text-gray-700 text-2xl sm:text-6xl lg:text-2xl font-bold">
          {product.brand}
        </h2>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
          {product.title}
        </h2>
        <h2
          className="text-5xl uppercase text-white dark:text-white/5
        sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
        >
          {product.feature}
        </h2>
      </div>
      <div className="order-1 sm:order-2">
        <div>
          <img
            src={product.img}
            alt=""
            className="w-[300px] sm:w-[300px] h-[300px] sm:h-[450px] children
            sm:scale-105 lg:scale-110 object-contain mx-auto pt-6
            drop-shadow-[-8px_4px_6px_rgba(0,0,0,0.4)] relative z-40"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;

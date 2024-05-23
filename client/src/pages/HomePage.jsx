/* eslint-disable react/prop-types */
import Hero from "../components/Hero";
import Cards from "../components/Cards";
import Features from "../components/Features";
import CTA from "../components/CTA";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Outlet } from "react-router";

function HomePage() {
  return (
    <>
      <Hero />
      <Cards />
      <Features />
      <CTA />
      <Outlet />
    </>
  );
}

export default HomePage;

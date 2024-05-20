/* eslint-disable react/prop-types */
import Navbar from "../components/NavBar/Navbar";
import Hero from "../components/Hero";
import Cards from "../components/Cards";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Main from "../components/shared/Main";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Outlet } from "react-router";
import { useState } from "react";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Main>
      <Navbar isAuthenticated={isAuthenticated} />
      <Hero />
      <Cards />
      <Features />
      <CTA />
      <Footer />
      <Outlet onSetAuthenticated={setIsAuthenticated} />
    </Main>
  );
}

export default HomePage;

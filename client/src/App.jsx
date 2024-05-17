// import { useState } from "react";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import Cards from "./components/Cards/Cards";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import CTA from "./components/CTA";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div
      className="bg-white dark:bg-gray-900 dark:text-white
    duration-200 overflow-hidden"
    >
      <Navbar />
      <Hero />
      <Cards />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

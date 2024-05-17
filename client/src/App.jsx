import { useState } from "react";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import Cards from "./components/Cards/Cards";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import CTA from "./components/CTA";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegisterForm from "./components/Register/RegisterForm";
import LoginForm from "./components/Login/LoginForm";

const isAuthenticated = false;

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function handleShowRegister(showRegister) {
    setShowRegister(!showRegister);
    setShowLogin(false);
  }

  function handleShowLogin(showLogin) {
    setShowLogin(!showLogin);
    setShowRegister(false);
  }

  return (
    <div
      className="bg-white dark:bg-gray-900 dark:text-white
    duration-200 overflow-hidden"
    >
      <Navbar
        isAuthenticated={isAuthenticated}
        showRegister={showRegister}
        onShowRegister={handleShowRegister}
      />
      <Hero />
      <Cards />
      <Features />
      <CTA />
      <Footer />
      {showRegister && (
        <RegisterForm
          showRegister={showRegister}
          onShowRegister={handleShowRegister}
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
        />
      )}

      {showLogin && (
        <LoginForm
          showRegister={showRegister}
          onShowRegister={handleShowRegister}
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
        />
      )}
    </div>
  );
}

export default App;

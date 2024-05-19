import { useState } from "react";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Features from "./components/Features";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          onSetAuthenticated={setIsAuthenticated}
        />
      )}

      {showLogin && (
        <LoginForm
          showRegister={showRegister}
          onShowRegister={handleShowRegister}
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
          onSetAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  );
}

export default App;

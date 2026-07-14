import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import background from "../assets/images/background.webp";
import mobileBackground from "../assets/images/background-mobile.webp";
import darkBackground from "../assets/images/background-dark.webp";

function AppLayout() {
  const { state } = useNavigation();
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("THEME") || "false");
  });

  return (
    <div
      className={`min-h-screen w-full flex flex-col ${darkMode ? "dark" : ""} text-white dark:text-black`}
    >
      {state === "loading" && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
          <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <ThemeContext.Provider value={{ darkMode, toggleMode: setDarkMode }}>
        <Navbar />
      </ThemeContext.Provider>

      <main className="relative grow">
        <img
          src={mobileBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover xs:hidden z-0"
        />
        <img
          src={background}
          alt="SM Background"
          className="absolute inset-0 w-full h-full object-cover hidden xs:block z-0"
        />
        <img
          src={darkBackground}
          alt="Dark Background"
          className="absolute inset-0 w-full h-full object-cover hidden dark:block z-0"
        />

        <div className="relative z-10 w-full h-full">
          <Outlet />
        </div>
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}

export default AppLayout;

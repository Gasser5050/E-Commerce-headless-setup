import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { CartProvider } from "../contexts/CartProvider";
import { ThemeContext } from "../contexts/ThemeContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  const { state } = useNavigation();
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("THEME") || "false");
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode: setDarkMode }}>
      <CartProvider>
        <div
          className={`min-h-screen w-full flex flex-col ${darkMode ? "dark" : ""} text-white dark:text-black`}
        >
          {state === "loading" && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
              <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Navbar />

          <main className="flex flex-col grow">
            <Outlet />
          </main>

          <Footer />

          <ScrollRestoration />
        </div>
      </CartProvider>
    </ThemeContext.Provider>
  );
}

export default AppLayout;

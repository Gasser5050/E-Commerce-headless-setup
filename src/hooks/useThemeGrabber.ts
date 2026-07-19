import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

import background from "../assets/images/background.webp";
import darkBackground from "../assets/images/background-dark.webp";
import mobileBackground from "../assets/images/background-mobile.webp";

export function useThemeGrabber() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("The Theme Context came back as null.");
  }
  const { darkMode } = theme;

  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 459px)").matches
  );

  const backgroundImage = () => {
    if (darkMode) return darkBackground;
    if (isMobile) return mobileBackground;
    return background;
  };

  const themeStyle = {
    backgroundImage: `url(${backgroundImage()})`
  };

  useEffect(() => {
    const mediaMatcher = window.matchMedia("(max-width: 459px)");

    const handleMatchChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaMatcher.addEventListener("change", handleMatchChange);

    return () => mediaMatcher.removeEventListener("change", handleMatchChange);
  }, []);

  return themeStyle;
}

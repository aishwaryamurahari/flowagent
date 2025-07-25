import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");

  // On mount, check localStorage for saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      setTheme("system");
    }
  }, []);

  // Apply theme to <html> and persist preference
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // system - listen for changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemTheme = () => {
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };

      // Apply initial system preference
      updateSystemTheme();

      // Listen for system preference changes
      mediaQuery.addEventListener("change", updateSystemTheme);

      // Cleanup listener when theme changes or component unmounts
      return () => {
        mediaQuery.removeEventListener("change", updateSystemTheme);
      };
    }
  }, [theme]);

  return { theme, setTheme };
}
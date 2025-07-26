import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // On mount, check localStorage for saved theme and sync with DOM
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const hasDarkClass = document.documentElement.classList.contains("dark");

    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      // Ensure DOM matches the saved theme
      if (saved === "dark" && !hasDarkClass) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else if (saved === "light" && hasDarkClass) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    } else {
      // Default to light if no theme is saved
      setTheme("light");
      // Ensure the HTML element doesn't have dark class
      if (hasDarkClass) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    }
  }, []);

  // Apply theme to <html> and persist preference
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const hasDarkClass = root.classList.contains("dark");

    if (theme === "dark" && !hasDarkClass) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else if (theme === "light" && hasDarkClass) {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  return { theme, setTheme, mounted };
}
import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force a re-render when theme changes
  const forceReRender = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

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

    // Force a re-render after theme change
    forceReRender();
  }, [theme, mounted, forceReRender]);

  // Listen for theme changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      }
    };

    const handleClassChange = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      const currentTheme = hasDarkClass ? "dark" : "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Listen for class changes on the HTML element
    const observer = new MutationObserver(handleClassChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, [theme]);

  return { theme, setTheme, mounted, forceUpdate };
}
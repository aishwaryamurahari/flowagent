"use client";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme, mounted, forceUpdate } = useTheme();

  if (!mounted) return null;

  const getNextTheme = () => {
    return theme === "light" ? "dark" : "light";
  };

  const getIcon = () => {
    if (theme === "light") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2"/>
          <path d="M12 21v2"/>
          <path d="M4.22 4.22l1.42 1.42"/>
          <path d="M18.36 18.36l1.42 1.42"/>
          <path d="M1 12h2"/>
          <path d="M21 12h2"/>
          <path d="M4.22 19.78l1.42-1.42"/>
          <path d="M18.36 5.64l1.42-1.42"/>
        </svg>
      );
    }
  };

  const handleClick = () => {
    const nextTheme = getNextTheme();

    // Directly manipulate the DOM and localStorage
    const root = document.documentElement;

    if (nextTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }

    // Update the state immediately
    setTheme(nextTheme);

    // Dispatch a custom event to notify all components
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme: nextTheme }
    }));

    // Force a re-render
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label={`Switch to ${getNextTheme()} mode`}
      title={`Current: ${theme}, Next: ${getNextTheme()}`}
    >
      {getIcon()}
    </button>
  );
}
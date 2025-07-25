"use client";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getNextTheme = () => {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "system";
      case "system":
        return "light";
      default:
        return "light";
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
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
      case "dark":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
          </svg>
        );
      case "system":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        );
      default:
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

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label={`Switch to ${getNextTheme()} mode`}
    >
      {getIcon()}
    </button>
  );
}
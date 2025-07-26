"use client";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export default function HeroCard() {
  const { theme, mounted } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if HTML has dark class
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDarkMode(hasDarkClass);
  }, [theme]);

  if (!mounted) {
    return (
      <div className="rounded-3xl shadow-2xl px-10 py-16 max-w-2xl w-full flex flex-col items-center border border-indigo-100 bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-8"></div>
          <div className="h-6 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Use both theme state and HTML class check
  const isDark = theme === "dark" || isDarkMode;

  return (
    <div
      className="rounded-3xl shadow-2xl px-10 py-16 max-w-2xl w-full flex flex-col items-center border transition-colors duration-200"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e0e7ff'
      }}
    >
      <h1 className="text-6xl font-extrabold mb-4 leading-tight drop-shadow flex justify-center items-center">
        <span
          className="text-transparent bg-clip-text drop-shadow-lg flex items-center gap-4"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #a5b4fc, #c084fc, #f472b6)'
              : 'linear-gradient(to right, #4338ca, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: isDark ? '#a5b4fc' : '#4338ca'
          }}
        >
          Flowagent
          <Image
            src="/logo.png"
            alt="FlowAgent Logo"
            width={56}
            height={56}
            className="mb-0"
            style={{ width: 'auto', height: 'auto' }}
          />
        </span>
      </h1>
      <span
        className="text-3xl font-semibold text-center block mb-4"
        style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
      >
        AI-Powered Email to Notion Tasks
      </span>
      <p
        className="text-2xl mb-8 max-w-2xl mx-auto font-medium"
        style={{ color: isDark ? '#d1d5db' : '#374151' }}
      >
        Effortlessly turn your emails into actionable Notion tasks. Stay organized, save time, and let FlowAgent do the heavy lifting.
      </p>
      <a
        href="#features"
        className="inline-block px-8 py-3 rounded-lg font-semibold text-xl shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
        style={{
          backgroundColor: '#4338ca',
          color: '#ffffff'
        }}
      >
        Get Started
      </a>
    </div>
  );
}
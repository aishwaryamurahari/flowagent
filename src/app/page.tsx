"use client";
import Image from "next/image";
import { NavLinks } from "./components/NavLinks";
import TopBarUser from "./components/TopBarUser";
import HeroCard from "./components/HeroCard";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, mounted, forceUpdate } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if HTML has dark class
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDarkMode(hasDarkClass);
  }, [theme, forceUpdate]);

  // Listen for theme change events
  useEffect(() => {
    const handleThemeChange = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDarkMode(hasDarkClass);
    };

    const handleStorageChange = () => {
      const saved = localStorage.getItem("theme");
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDarkMode(hasDarkClass);
    };

    // Listen for custom theme change events
    window.addEventListener('themeChange', handleThemeChange);

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Listen for class changes on the HTML element
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 font-sans text-gray-900">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-32 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Use both theme state and HTML class check
  const isDark = theme === "dark" || isDarkMode;

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-200"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom right, #111827, #1f2937, #312e81)'
          : 'linear-gradient(to bottom right, #f9fafb, #ffffff, #eef2ff)',
        color: isDark ? '#f9fafb' : '#111827'
      }}
    >
      {/* Hero Section as Card */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none -z-10">
        </div>
        <HeroCard />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
        >
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border transition hover:shadow-xl"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }}
          >
            <Image src="/email-summarization-image.png" alt="AI Summarization" width={64} height={64} className="mb-4" />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              AI-Powered Email Summarization
            </h3>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              Let FlowAgent read and summarize your emails, extracting the most important tasks and information automatically.
            </p>
          </div>
          {/* Feature 2 */}
          <div
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border transition hover:shadow-xl"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }}
          >
            <Image src="/notion-logo.png" alt="Notion Tasks" width={64} height={64} className="mb-4" />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              Auto Task Creation in Notion
            </h3>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              Tasks are instantly created in your Notion workspace, keeping your workflow organized and up-to-date.
            </p>
          </div>
          {/* Feature 3 */}
          <div
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border transition hover:shadow-xl"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }}
          >
            <Image src="/gmail-labeling-image.png" alt="Smart Gmail Labeling" width={64} height={64} className="mb-4" />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              Smart Gmail Labeling
            </h3>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              Processed emails are automatically labeled in Gmail, so you always know what's been handled.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
        >
          How it works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">1</div>
            <h4
              className="text-lg font-bold mb-1"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              Sign in
            </h4>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              Connect your Google account securely to get started.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">2</div>
            <h4
              className="text-lg font-bold mb-1"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              Review Emails
            </h4>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              FlowAgent summarizes and highlights tasks from your inbox.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">3</div>
            <h4
              className="text-lg font-bold mb-1"
              style={{ color: isDark ? '#a5b4fc' : '#4338ca' }}
            >
              Push to Notion
            </h4>
            <p style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
              Send tasks to Notion with one click and stay organized.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

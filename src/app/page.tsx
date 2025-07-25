import Image from "next/image";
import { NavLinks } from "./components/NavLinks";
import TopBarUser from "./components/TopBarUser";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Hero Section as Card */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none -z-10">
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl px-10 py-16 max-w-2xl w-full flex flex-col items-center border border-indigo-100 dark:border-indigo-800">
          <h1 className="text-6xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-4 leading-tight drop-shadow flex justify-center items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-400 dark:to-pink-400 drop-shadow-lg flex items-center gap-4">
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
          <span className="text-3xl font-semibold text-indigo-700 dark:text-indigo-300 text-center block">AI-Powered Email to Notion Tasks</span>
          <p className="text-2xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-medium">
            Effortlessly turn your emails into actionable Notion tasks. Stay organized, save time, and let FlowAgent do the heavy lifting.
          </p>
          <a href="#features" className="inline-block px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold text-xl shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 transition hover:shadow-xl">
            <Image src="/email-summarization-image.png" alt="AI Summarization" width={64} height={64} className="mb-4" />
            <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">AI-Powered Email Summarization</h3>
            <p className="text-gray-600 dark:text-gray-400">Let FlowAgent read and summarize your emails, extracting the most important tasks and information automatically.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 transition hover:shadow-xl">
            <Image src="/notion-logo.png" alt="Notion Tasks" width={64} height={64} className="mb-4" />
            <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">Auto Task Creation in Notion</h3>
            <p className="text-gray-600 dark:text-gray-400">Tasks are instantly created in your Notion workspace, keeping your workflow organized and up-to-date.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 transition hover:shadow-xl">
            <Image src="/gmail-labeling-image.png" alt="Smart Gmail Labeling" width={64} height={64} className="mb-4" />
            <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">Smart Gmail Labeling</h3>
            <p className="text-gray-600 dark:text-gray-400">Processed emails are automatically labeled in Gmail, so you always know what's been handled.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-12">How it works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">1</div>
            <h4 className="text-lg font-bold mb-1 text-indigo-700 dark:text-indigo-300">Sign in</h4>
            <p className="text-gray-600 dark:text-gray-400">Connect your Google account securely to get started.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">2</div>
            <h4 className="text-lg font-bold mb-1 text-indigo-700 dark:text-indigo-300">Review Emails</h4>
            <p className="text-gray-600 dark:text-gray-400">FlowAgent summarizes and highlights tasks from your inbox.</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-lg">3</div>
            <h4 className="text-lg font-bold mb-1 text-indigo-700 dark:text-indigo-300">Push to Notion</h4>
            <p className="text-gray-600 dark:text-gray-400">Send tasks to Notion with one click and stay organized.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

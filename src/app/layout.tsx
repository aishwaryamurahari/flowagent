import "./globals.css";
import { Providers } from "./providers";
import { NavLinks } from "./components/NavLinks";
import TopBarUser from "./components/TopBarUser";
import Image from "next/image";

export const metadata = {
  title: "FlowAgent",
  description: "Autonomous email-to-task agent",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 dark:text-gray-100 text-gray-900 min-h-screen font-sans">
        <Providers>
          {/* Top Bar: logo left, welcome+signout right */}
          <div className="w-full flex items-center justify-between py-2 px-8 bg-white/95 dark:bg-gray-900/95 border-b border-indigo-50 dark:border-indigo-900 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/flowagent-logo.png"
                  alt="FlowAgent Logo"
                  width={60}
                  height={60}
                  priority
                />
              </div>
            </div>
            <TopBarUser />
          </div>

          {/* Navigation Tabs: centered, pill style */}
          <div className="w-full flex justify-center bg-transparent py-4">
            <div className="bg-white dark:bg-gray-900 rounded-full shadow px-4 py-1 flex gap-2 border border-indigo-100 dark:border-indigo-900">
              <NavLinks />
            </div>
          </div>

          <main className="max-w-5xl mx-auto p-6 min-h-[calc(100vh-80px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import { Providers } from "./providers";
import { NavLinks } from "./components/NavLinks";

export const metadata = {
  title: "FlowAgent",
  description: "Autonomous email-to-task agent",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 min-h-screen font-sans">
        <Providers>
          <header className="sticky top-0 z-30 p-4 border-b shadow-sm bg-white/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">F</span>
                <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">FlowAgent</h1>
              </div>
              <NavLinks />
            </div>
          </header>
          <main className="max-w-5xl mx-auto p-6 min-h-[calc(100vh-80px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

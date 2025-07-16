// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'FlowAgent',
  description: 'Autonomous agent that turns emails into actionable Notion tasks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        <header className="p-4 border-b shadow-sm bg-white">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">FlowAgent</h1>
            {/* Optional nav items */}
            <nav className="space-x-4 text-sm text-gray-700">
              <a href="/" className="hover:underline">Home</a>
              <a href="/inbox" className="hover:underline">Inbox</a>
              <a href="/agent" className="hover:underline">Agent</a>
              <a href="/tasks" className="hover:underline">Tasks</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}

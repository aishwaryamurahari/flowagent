// app/page.tsx
export default function HomePage() {
    return (
      <section className="text-center mt-16">
        <h2 className="text-4xl font-bold mb-4">Welcome to FlowAgent</h2>
        <p className="text-lg text-gray-700 mb-6">
          Your autonomous assistant for converting emails into actionable Notion tasks.
        </p>
        <div className="text-sm text-gray-500">
          Start by visiting <code className="bg-gray-100 px-1 py-0.5 rounded">/inbox</code> to fetch your Gmail messages.
        </div>
      </section>
    );
  }

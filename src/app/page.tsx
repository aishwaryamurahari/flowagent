import { AuthButtons } from "@/components/AuthButtons";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white/90 rounded-xl shadow-lg p-10 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-4 text-indigo-700">Welcome to FlowAgent</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Your autonomous assistant for converting emails into actionable Notion tasks.
        </p>
        <div className="w-full flex flex-col items-center space-y-2">
          <AuthButtons />
        </div>
      </div>
    </section>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchEmailBody } from "@/lib/gmail";
import { runAgent } from "@/lib/agent";
import PushToNotionButtonWrapper from "./PushToNotionButtonWrapper";

export default async function EmailDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <p className="text-red-600 dark:text-red-400">You must be signed in.</p>;
  }

  // fetchEmailBody now returns { summary, jobLinks }
  const emailBodyResult = await fetchEmailBody(session.accessToken, params.id);
  const agentResult = await runAgent(emailBodyResult.summary);

  // Format the email content for better readability
  const formatEmailContent = (content: string) => {
    if (!content) return content;
    // Split into paragraphs and format
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100"
        style={{
          marginBottom: '16px',
          lineHeight: '1.6'
        }}
      >
        {paragraph.trim()}
      </p>
    ));
  };

  // Helper function to check if due date should be displayed
  const shouldShowDueDate = (dueDate: string | undefined) => {
    return dueDate && dueDate !== "" && dueDate !== "None" && dueDate !== "null";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Email Content */}
      <div
        className="bg-white/90 dark:bg-gray-900/90 p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 className="font-semibold mb-4 text-lg text-indigo-700 dark:text-indigo-300">📧 Original Email</h3>
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
          {formatEmailContent(emailBodyResult.summary)}
        </div>
      </div>

      {/* Agent Task Summary */}
      <div
        className="bg-white/90 dark:bg-gray-900/90 p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 className="font-semibold mb-4 text-lg text-indigo-700 dark:text-indigo-300">🧠 Agent Task Summary</h3>
        <div className="space-y-3">
          <p
            className="text-base leading-relaxed text-gray-900 dark:text-gray-100"
            style={{
              fontSize: '16px',
              lineHeight: '1.6'
            }}
          >
            {agentResult.task}
          </p>
          {shouldShowDueDate(agentResult.dueDate) && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Due:</strong> {agentResult.dueDate}
            </p>
          )}
          {agentResult.priority && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Priority:</strong> {agentResult.priority}
            </p>
          )}
        </div>

        <div className="mt-6">
          <PushToNotionButtonWrapper
            task={agentResult.task}
            dueDate={agentResult.dueDate}
            priority={agentResult.priority}
            emailId={params.id}
            accessToken={session.accessToken}
          />
        </div>
      </div>
    </div>
  );
}

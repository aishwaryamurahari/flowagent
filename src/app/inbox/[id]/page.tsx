import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchEmailBody } from "@/lib/gmail";
import { runAgent } from "@/lib/agent";
import PushToNotionButtonWrapper from "./PushToNotionButtonWrapper";

export default async function EmailDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <p className="text-red-600">You must be signed in.</p>;
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
        className="mb-4 leading-relaxed"
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
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 text-center">Email to Task</h2>

      <div
        className="bg-white/90 p-6 border border-gray-200 rounded-xl shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 className="font-semibold mb-4 text-lg text-indigo-700">📧 Email Content</h3>
        <div
          className="text-sm leading-relaxed"
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {/* Show the summary as before */}
          {formatEmailContent(emailBodyResult.summary)}
          {/* Show clickable job links if present */}
          {emailBodyResult.jobLinks && emailBodyResult.jobLinks.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-indigo-600">Job Links:</h4>
              <ul className="list-disc pl-6">
                {emailBodyResult.jobLinks.map((job, idx) => (
                  <li key={idx} className="mb-2">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {job.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        className="bg-white/90 p-6 border border-gray-200 rounded-xl shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 className="font-semibold mb-4 text-lg text-indigo-700">🧠 Agent Task Summary</h3>
        <div className="space-y-3">
          <p
            className="text-base leading-relaxed"
            style={{
              fontSize: '16px',
              lineHeight: '1.6'
            }}
          >
            {agentResult.task}
          </p>
          {shouldShowDueDate(agentResult.dueDate) && (
            <p className="text-sm text-gray-600">
              <strong>Due:</strong> {agentResult.dueDate}
            </p>
          )}
          {agentResult.priority && (
            <p className="text-sm text-gray-600">
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

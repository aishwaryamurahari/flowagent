import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchEmailBody } from "@/lib/gmail";
import { runAgent } from "@/lib/agent";
import PushToNotionButtonWrapper from "./PushToNotionButtonWrapper";

export default async function EmailDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const session = await getServerSession(authOptions);

  if (!(session as { accessToken?: string })?.accessToken) {
    return <p className="text-red-600 dark:text-red-400">You must be signed in.</p>;
  }

  // Validate email ID format
  if (!params.id || params.id.length < 10) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Invalid Email ID</h3>
          <p className="text-red-700 dark:text-red-300">
            The email ID provided is invalid or too short.
          </p>
        </div>
      </div>
    );
  }

  try {
    // fetchEmailBody now returns { summary, jobLinks }
    const emailBodyResult = await fetchEmailBody((session as { accessToken?: string }).accessToken!, params.id);

    // Check if we got an error response from fetchEmailBody
    if (emailBodyResult.summary.startsWith("Error:")) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Error Loading Email</h3>
            <p className="text-red-700 dark:text-red-300">{emailBodyResult.summary}</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              This could be due to the email being deleted, insufficient permissions, or a temporary issue.
            </p>
          </div>
        </div>
      );
    }

    const agentResult = await runAgent(emailBodyResult.summary);

    // Format the email content for better readability
    const formatEmailContent = (content: string) => {
      if (!content) return content;

      // Clean up the content by removing excessive whitespace and formatting
      const cleanedContent = content
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\n\s*\n/g, '\n\n') // Clean up line breaks
        .trim();

      // Split into paragraphs and format
      const paragraphs = cleanedContent.split('\n\n').filter(p => p.trim().length > 0);

      return paragraphs.map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim();

        // Skip very long URLs or encoded strings
        if (trimmedParagraph.length > 200 && trimmedParagraph.includes('http')) {
          return null;
        }

        return (
          <p
            key={index}
            className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100 break-words"
            style={{
              marginBottom: '16px',
              lineHeight: '1.6',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {trimmedParagraph}
          </p>
        );
      }).filter(Boolean); // Remove null elements
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
          <div className="space-y-4 text-gray-900 dark:text-gray-100 max-w-full">
            <div className="prose prose-sm max-w-none">
              {formatEmailContent(emailBodyResult.summary)}
            </div>
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
              accessToken={(session as { accessToken?: string }).accessToken!}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in EmailDetailPage:', error);
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Error Loading Email</h3>
          <p className="text-red-700 dark:text-red-300">
            An unexpected error occurred while loading this email. Please try again later.
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            Error details: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchEmails } from "@/lib/gmail";
import Link from "next/link";

export default async function InboxPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-red-600 dark:text-red-400">Please sign in to view emails.</p>
      </div>
    );
  }

  const emails = await fetchEmails(session.accessToken);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 dark:text-indigo-300 text-center">Your Recent Emails</h2>
      {emails.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No unprocessed emails found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">All your recent emails have been processed and sent to Notion!</p>
        </div>
      ) :
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {emails.map((email) => {
            const initials = email.from?.match(/\b\w/g)?.join("")?.slice(0,2)?.toUpperCase() || "?";
            return (
              <div
                key={email.id}
                className={`rounded-xl shadow-md p-6 flex items-start space-x-4 hover:shadow-lg transition-all duration-200 ${
                  email.isUnread
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500'
                    : 'bg-white/90 dark:bg-gray-900/90 border-l-4 border-transparent'
                }`}
                style={{
                  backgroundColor: email.isUnread ? '#eef2ff' : 'rgba(255, 255, 255, 0.9)',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  transition: 'all 0.2s ease-in-out',
                  borderLeft: email.isUnread ? '4px solid #6366f1' : '4px solid transparent'
                }}
              >
                <div className="relative">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border ${
                      email.isUnread
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700'
                    }`}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: email.isUnread ? '#4f46e5' : '#e0e7ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: email.isUnread ? '#ffffff' : '#4f46e5',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      border: email.isUnread ? '1px solid #4f46e5' : '1px solid #c7d2fe',
                      flexShrink: '0'
                    }}
                  >
                    {initials}
                  </div>
                  {email.isUnread && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#ef4444',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <Link href={`/inbox/${email.id}`} className="block group">
                    <h3
                      className={`text-lg group-hover:underline truncate mb-1 ${
                        email.isUnread ? 'font-bold text-indigo-900 dark:text-indigo-100' : 'font-semibold text-indigo-800 dark:text-indigo-200'
                      }`}
                      style={{
                        fontWeight: email.isUnread ? '700' : '600',
                        fontSize: '18px',
                        color: email.isUnread ? '#1e1b4b' : '#1e1b4b',
                        textDecoration: 'none',
                        marginBottom: '4px',
                        lineHeight: '1.2'
                      }}
                    >
                      {email.subject}
                    </h3>
                    <p
                      className={`truncate mb-1 ${
                        email.isUnread ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-600 dark:text-gray-400'
                      }`}
                      style={{
                        fontSize: '14px',
                        color: email.isUnread ? '#374151' : '#4b5563',
                        fontWeight: email.isUnread ? '500' : '400',
                        marginBottom: '4px',
                        lineHeight: '1.3'
                      }}
                    >
                      {email.from}
                    </p>
                    <p
                      className={`text-xs ${
                        email.isUnread ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                      }`}
                      style={{
                        fontSize: '12px',
                        color: email.isUnread ? '#4b5563' : '#9ca3af',
                        lineHeight: '1.2'
                      }}
                    >
                      {email.date}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

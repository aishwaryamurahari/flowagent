import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchEmails } from "@/lib/gmail";
import Link from "next/link";

export default async function InboxPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-red-600">Please sign in to view emails.</p>
      </div>
    );
  }

  const emails = await fetchEmails(session.accessToken);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">Your Recent Emails</h2>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {emails.map((email) => {
          const initials = email.from?.match(/\b\w/g)?.join("")?.slice(0,2)?.toUpperCase() || "?";
          return (
            <div
              key={email.id}
              className="bg-white/90 rounded-xl shadow-md p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                transition: 'box-shadow 0.2s ease-in-out'
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg border border-indigo-200"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4f46e5',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  border: '1px solid #c7d2fe',
                  flexShrink: '0'
                }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <Link href={`/inbox/${email.id}`} className="block group">
                  <h3
                    className="font-semibold text-lg text-indigo-800 group-hover:underline truncate mb-1"
                    style={{
                      fontWeight: '600',
                      fontSize: '18px',
                      color: '#1e1b4b',
                      textDecoration: 'none',
                      marginBottom: '4px',
                      lineHeight: '1.2'
                    }}
                  >
                    {email.subject}
                  </h3>
                  <p
                    className="text-sm text-gray-600 truncate mb-1"
                    style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      marginBottom: '4px',
                      lineHeight: '1.3'
                    }}
                  >
                    {email.from}
                  </p>
                  <p
                    className="text-xs text-gray-400"
                    style={{
                      fontSize: '12px',
                      color: '#9ca3af',
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
    </div>
  );
}

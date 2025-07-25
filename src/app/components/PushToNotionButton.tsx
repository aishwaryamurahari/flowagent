'use client';

import { useState } from 'react';

export default function PushToNotionButton({
  task,
  dueDate,
  priority,
  emailId,
  accessToken
}: {
  task: string,
  dueDate?: string,
  priority?: string,
  emailId?: string,
  accessToken?: string
}) {
  const [status, setStatus] = useState('');

  const handlePush = async () => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task,
          dueDate,
          priority,
          emailId,
          accessToken,
        }),
      });

      if (res.ok) {
        setStatus('✅ Task sent to Notion!');
        // Redirect back to inbox after a short delay
        setTimeout(() => {
          window.location.href = '/inbox';
        }, 1500);
      } else {
        const errorData = await res.json();
        setStatus(`❌ Failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error pushing to Notion:', error);
      setStatus('❌ Network error occurred');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handlePush}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        style={{
          padding: '8px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out'
        }}
      >
        Push to Notion
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}

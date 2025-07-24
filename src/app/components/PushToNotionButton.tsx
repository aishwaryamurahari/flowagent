'use client';

import { useState } from 'react';

export default function PushToNotionButton({ task, dueDate, priority }: { task: string, dueDate?: string, priority?: string }) {
  const [status, setStatus] = useState('');

  const handlePush = async () => {
    setStatus('Sending...');
    const res = await fetch('/api/notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task,
        dueDate,
        priority,
      }),
    });

    if (res.ok) {
      setStatus('✅ Task sent to Notion!');
    } else {
      setStatus('❌ Failed to send.');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handlePush}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Push to Notion
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}

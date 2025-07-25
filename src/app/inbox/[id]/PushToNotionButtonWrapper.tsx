"use client";

import PushToNotionButton from "@/app/components/PushToNotionButton";

export default function PushToNotionButtonWrapper({
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
  return (
    <PushToNotionButton
      task={task}
      dueDate={dueDate}
      priority={priority}
      emailId={emailId}
      accessToken={accessToken}
    />
  );
}
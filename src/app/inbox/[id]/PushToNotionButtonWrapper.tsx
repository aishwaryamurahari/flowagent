"use client";

import PushToNotionButton from "@/app/components/PushToNotionButton";

export default function PushToNotionButtonWrapper({ task, dueDate, priority }: { task: string, dueDate?: string, priority?: string }) {
  return <PushToNotionButton task={task} dueDate={dueDate} priority={priority} />;
}
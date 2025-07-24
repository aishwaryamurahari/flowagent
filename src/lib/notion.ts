// lib/notion.ts
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function createNotionTask({
  title,
  dueDate,
  priority,
}: {
  title: string;
  dueDate?: string;
  priority?: string;
}) {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const properties: any = {
    Name: {
      title: [{ text: { content: title } }],
    },
  };

  if (dueDate) {
    properties["Due Date"] = {
      date: { start: dueDate },
    };
  }

  if (priority) {
    properties["Priority"] = {
      select: { name: priority },
    };
  }

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  });

  return response;
}

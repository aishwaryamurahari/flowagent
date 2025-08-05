// app/api/notion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { markEmailAsProcessed } from "@/lib/gmail";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function POST(req: NextRequest) {
  const { title, dueDate, priority, emailId, accessToken } = await req.json();

  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY environment variable is not set');
    }

    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID environment variable is not set');
    }

    // Validate and parse dueDate
    let parsedDueDate = null;
    if (dueDate && dueDate !== 'None' && dueDate !== 'null' && dueDate !== '') {
      try {
        const date = new Date(dueDate);
        if (!isNaN(date.getTime())) {
          parsedDueDate = { start: date.toISOString() };
        }
      } catch {
        console.warn('Invalid dueDate format:', dueDate);
      }
    }

    const result = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title || 'Untitled Task',
              },
            },
          ],
        },
        'Due date': {
          date: parsedDueDate,
        },
        Priority: {
          select: priority
            ? { name: priority }
            : null,
        },
      },
    });

    console.log('Notion page created successfully:', result.id);

    // Mark email as processed if emailId and accessToken are provided
    if (emailId && accessToken) {
      try {
        await markEmailAsProcessed(accessToken, emailId);
      } catch (error) {
        console.warn('Failed to mark email as processed:', error);
        // Don't fail the entire request if marking as processed fails
      }
    }

    return NextResponse.json({ message: 'Task created in Notion' });
  } catch (error) {
    console.error('Error pushing to Notion:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      title: title || 'Untitled Task',
    });

    // Return more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to push to Notion';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

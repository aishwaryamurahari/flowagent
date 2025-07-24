// app/api/notion/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

export async function POST(req: NextRequest) {
  const { title, dueDate, priority } = await req.json();

  try {
    // Validate and parse dueDate
    let parsedDueDate = null;
    if (dueDate && dueDate !== 'None' && dueDate !== 'null') {
      try {
        const date = new Date(dueDate);
        if (!isNaN(date.getTime())) {
          parsedDueDate = { start: date.toISOString() };
        }
      } catch (error) {
        console.warn('Invalid dueDate format:', dueDate);
      }
    }

    await notion.pages.create({
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

    return NextResponse.json({ message: 'Task created in Notion' });
  } catch (err) {
    console.error('Error pushing to Notion:', err);
    return NextResponse.json({ error: 'Failed to push to Notion' }, { status: 500 });
  }
}

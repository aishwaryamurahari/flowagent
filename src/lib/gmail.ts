// lib/gmail.ts
import { google } from "googleapis";
import { htmlToText } from "html-to-text";

function extractTask(lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      /send|update|review|complete|finish|highlight|remind|submit|call|email|schedule|plan|fix|deploy|test|write|read|check|make|ensure|remind/i.test(line)
      && line.length > 10
    ) {
      // Join with next lines if not ending with punctuation
      let task = line;
      let j = i + 1;
      while (
        j < lines.length &&
        !/[.!?]$/.test(task.trim()) &&
        lines[j].length > 0
      ) {
        task += ' ' + lines[j];
        j++;
      }
      return task.trim();
    }
  }
  // fallback: first non-greeting, non-signature line
  return (
    lines.find(
      l => !/^(-|thanks|regards|hi|hello|dear|best|sincerely|cheers|am)$/i.test(l)
    ) || "No specific task found."
  );
}

function createEmailSummary(content: string): string {
  if (!content) return "No content available";

  // Extract due date (look for dates or days)
  const dueDateMatch = content.match(/by\s+([A-Za-z]+\s*\(?.*?\)?)/i);
  const dueDate = dueDateMatch ? dueDateMatch[1] : null;

  // Extract priority
  const priorityMatch = content.match(/priority|urgent|important/i);
  const priority = priorityMatch ? "High" : "Normal";

  // Extract first actionable line (imperative), join lines if needed
  const lines = content.split(/\n|\r/).map(l => l.trim()).filter(Boolean);
  const task = extractTask(lines);

  let summary = '';
  summary += `📝 Task: ${task}\n`;
  summary += `📅 Due: ${dueDate || "No due date found"}\n`;
  summary += `⭐ Priority: ${priority}\n`;

  return summary.trim();
}

// Function to clean email content by removing unwanted information
function cleanEmailContent(content: string): string {
  if (!content) return content;

  let cleaned = content;

  // Remove all the unwanted placeholders and their associated content
  cleaned = cleaned.replace(/\[Job Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Tracking Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Search Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Help Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Reference Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Token Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Unsubscribe Link\].*$/gm, '');
  cleaned = cleaned.replace(/\[Manage Link\].*$/gm, '');

  // Remove long dashes and separators
  cleaned = cleaned.replace(/[-]{10,}/g, '');
  cleaned = cleaned.replace(/[_]{10,}/g, '');
  cleaned = cleaned.replace(/[=]{10,}/g, '');

  // Remove tracking URLs and long LinkedIn URLs
  cleaned = cleaned.replace(/https:\/\/www\.linkedin\.com\/comm\/jobs\/view\/\d+\?[^\s]*trackingId=[^\s]*/g, '');
  cleaned = cleaned.replace(/https:\/\/www\.linkedin\.com\/help\/linkedin\/answer\/[^\s]*/g, '');
  cleaned = cleaned.replace(/https:\/\/www\.linkedin\.com\/comm\/jobs\/search\?[^\s]*/g, '');

  // Remove only URLs with tracking parameters, not all URLs
  cleaned = cleaned.replace(/https?:\/\/[^\s]*trackingId=[^\s]*/g, '');
  cleaned = cleaned.replace(/https?:\/\/[^\s]*refid=[^\s]*/g, '');
  cleaned = cleaned.replace(/https?:\/\/[^\s]*midToken=[^\s]*/g, '');
  cleaned = cleaned.replace(/https?:\/\/[^\s]*trk=[^\s]*/g, '');

  // Remove unsubscribe and manage links
  cleaned = cleaned.replace(/https?:\/\/[^\s]*unsubscribe[^\s]*/g, '');
  cleaned = cleaned.replace(/https?:\/\/[^\s]*manage[^\s]*/g, '');

  // Remove email footers and boilerplate text more carefully
  cleaned = cleaned.replace(/©\s*\d{4}\s*LinkedIn\s*Corporation[^.]*\./g, '');
  cleaned = cleaned.replace(/LinkedIn\s+and\s+the\s+LinkedIn\s+logo\s+are\s+registered\s+trademarks[^.]*\./g, '');
  cleaned = cleaned.replace(/You\s+are\s+receiving\s+Job\s+Alert\s+emails[^.]*\./g, '');
  cleaned = cleaned.replace(/Manage\s+your\s+job\s+alerts:[^.]*\./g, '');
  cleaned = cleaned.replace(/Unsubscribe:[^.]*\./g, '');
  cleaned = cleaned.replace(/Help:[^.]*\./g, '');
  cleaned = cleaned.replace(/Learn\s+why\s+we\s+included\s+this:[^.]*\./g, '');

  // Remove repetitive phrases
  cleaned = cleaned.replace(/WiraaUnited\s+StatesFast\s+growing/g, 'Wiraa - United States - Fast growing');
  cleaned = cleaned.replace(/Jobright\.aiUnited\s+States/g, 'Jobright.ai - United States');

  // Remove excessive whitespace and empty lines
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.replace(/^\s+|\s+$/gm, ''); // Trim whitespace from each line

  // Remove lines that are ONLY tracking info or boilerplate, but DO NOT remove lines that are just URLs
  cleaned = cleaned.split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove completely empty lines
      if (trimmed.length === 0) return false;
      // DO NOT remove lines that are just URLs here
      // Remove lines that start with 'View job:', 'Unsubscribe', 'Manage your job alerts', etc.
      if (/^(View job:|Unsubscribe|Manage your job alerts|See all jobs on LinkedIn|Learn why we included this|Help:|©|LinkedIn and the LinkedIn logo|This email was intended for)/i.test(trimmed)) return false;
      // Remove lines that are just tracking tokens or boilerplate
      if (/^[-=_]{5,}$/.test(trimmed)) return false;
      return true;
    })
    .join('\n');

  return cleaned.trim();
}

function extractJobLinks(content: string): { title: string; url: string }[] {
  const jobs: { title: string; url: string }[] = [];
  // Find all URLs
  const urlRegex = /https?:\/\/\S+/g;
  // Split into tokens by 'View job:' (which often precedes a job entry)
  const tokens = content.split(/View job:/);
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    const urlMatch = token.match(urlRegex);
    if (urlMatch) {
      // The job title is the text before the URL
      const title = token.split(urlMatch[0])[0].replace(/\s+/g, ' ').trim();
      jobs.push({
        title: title || 'Job Opportunity',
        url: urlMatch[0],
      });
    }
  }
  return jobs;
}

// Function to mark an email as processed by adding a custom label
export async function markEmailAsProcessed(accessToken: string, emailId: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  try {
    // First, check if the "Processed" label exists, if not create it
    const labelsResponse = await gmail.users.labels.list({ userId: "me" });
    const processedLabel = labelsResponse.data.labels?.find(label => label.name === "Processed");

    let labelId = processedLabel?.id;

    if (!labelId) {
      // Create the "Processed" label
      const createLabelResponse = await gmail.users.labels.create({
        userId: "me",
        requestBody: {
          name: "Processed",
          labelListVisibility: "labelHide",
          messageListVisibility: "hide"
        }
      });
      labelId = createLabelResponse.data.id;
      console.log('markEmailAsProcessed: Created new label with id', labelId);
    } else {
      console.log('markEmailAsProcessed: Found existing label with id', labelId);
    }

    // Add the "Processed" label to the email
    const modifyResult = await gmail.users.messages.modify({
      userId: "me",
      id: emailId,
      requestBody: {
        addLabelIds: [labelId!]
      }
    });
    console.log('markEmailAsProcessed: Added label to email', emailId, 'labelId:', labelId, 'result:', modifyResult.data);

    return true;
  } catch (error) {
    console.error('Error marking email as processed:', error);
    throw error;
  }
}

export async function fetchEmails(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  // Get the label ID for 'Processed'
  const labelsResponse = await gmail.users.labels.list({ userId: "me" });
  const processedLabel = labelsResponse.data.labels?.find(label => label.name === "Processed");
  const processedLabelId = processedLabel?.id;
  console.log('Processed labelId:', processedLabelId);

  // Fetch more emails initially to account for processed ones
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10, // Fetch more emails initially
  });

  const messages = res.data.messages ?? [];

  // Fetch message details (like subject)
  const messageDetails = await Promise.all(
    messages.map(async (msg) => {
      const message = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      });

      const headers = message.data.payload?.headers ?? [];
      const labelIds = message.data.labelIds || [];
      const isUnread = labelIds.includes('UNREAD');
      // FIX: Check for processedLabelId, not 'Processed'
      const isProcessed = processedLabelId ? labelIds.includes(processedLabelId) : false;

      // Debug log: print out the labelIds for each email
      console.log(`Email ID: ${msg.id}, Subject: ${headers.find((h) => h.name === "Subject")?.value}, labelIds:`, labelIds, '| isProcessed:', isProcessed);
      if (isProcessed) {
        console.log(`Email ID: ${msg.id} is marked as Processed (labelId: ${processedLabelId}) and will be filtered out.`);
      }

      const getHeader = (name: string) =>
        headers.find((h) => h.name === name)?.value ?? "";

      return {
        id: msg.id,
        subject: getHeader("Subject"),
        from: getHeader("From"),
        date: getHeader("Date"),
        isUnread: isUnread,
        isProcessed: isProcessed,
      };
    })
  );

  // Filter out processed emails and return only the first 5 unprocessed emails
  const unprocessedEmails = messageDetails
    .filter(email => !email.isProcessed)
    .slice(0, 5);

  // Debug log: print out the IDs of emails being returned
  console.log('Returning unprocessed email IDs:', unprocessedEmails.map(e => e.id));

  return unprocessedEmails;
}

// In fetchEmailBody, extract job links and return them along with the summary
export async function fetchEmailBody(accessToken: string, messageId: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const message = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });

  const parts = message.data.payload?.parts;

  const plainPart = parts?.find((part) => part.mimeType === "text/plain");
  const htmlPart = parts?.find((part) => part.mimeType === "text/html");

  let raw = "";

  if (plainPart?.body?.data) {
    raw = Buffer.from(plainPart.body.data, "base64").toString("utf-8");
  } else if (htmlPart?.body?.data) {
    raw = Buffer.from(htmlPart.body.data, "base64").toString("utf-8");
    raw = htmlToText(raw); // convert html to readable text
  }

  // Clean the content before summarizing
  const cleanedContent = cleanEmailContent(raw);
  // Debug log: print the cleaned content
  console.log('fetchEmailBody: cleaned content:', cleanedContent);

  // Create a structured summary instead of raw content
  const summary = createEmailSummary(cleanedContent);
  // Debug log: print the summary
  console.log('fetchEmailBody: summary:', summary);

  // Extract job links
  const jobLinks = extractJobLinks(cleanedContent);
  console.log('fetchEmailBody: jobLinks:', jobLinks);

  // Return both summary and jobLinks
  return { summary, jobLinks };
}

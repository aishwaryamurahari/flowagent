// lib/gmail.ts
import { google } from "googleapis";
import { htmlToText } from "html-to-text";

export async function fetchEmails(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5,
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

      const getHeader = (name: string) =>
        headers.find((h) => h.name === name)?.value ?? "";

      return {
        id: msg.id,
        subject: getHeader("Subject"),
        from: getHeader("From"),
        date: getHeader("Date"),
      };
    })
  );

  return messageDetails;
}

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

    return raw || "[No readable email content found]";
  }

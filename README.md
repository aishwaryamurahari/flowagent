# FlowAgent

FlowAgent is an autonomous assistant that converts your emails into actionable Notion tasks. It integrates with Gmail and Notion, allowing you to seamlessly process your inbox and push important tasks directly to your Notion workspace.

## Features

- **Google Authentication**: Securely sign in with your Google account.
- **Inbox View**: See your recent, unprocessed emails in a clean, actionable interface.
- **Email-to-Task Conversion**: Automatically extract tasks, due dates, and priorities from your emails.
- **Push to Notion**: Send tasks to your Notion database with a single click.
- **Processed Email Tracking**: Emails that have been pushed to Notion are marked as processed and hidden from your inbox view.
- **Modern UI**: Built with Next.js and Tailwind CSS for a fast, responsive experience.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (Google OAuth)
- [Google APIs (Gmail)](https://developers.google.com/gmail/api)
- [Notion API](https://developers.notion.com/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Google Cloud project with OAuth credentials
- A Notion integration and database

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NOTION_API_KEY=your-notion-integration-secret
NOTION_DATABASE_ID=your-notion-database-id
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-random-secret
```

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Usage

1. **Sign in with Google**: Click "Sign in with Google" on the homepage.
2. **View Inbox**: Navigate to the Inbox to see your recent, unprocessed emails.
3. **Push to Notion**: For each email, review the extracted task and push it to your Notion database.
4. **Processed Tracking**: Once pushed, emails are marked as processed and will not appear again.

## Project Structure

- `src/app/` – Next.js app directory (pages, API routes, components)
- `src/lib/` – Gmail and Notion integration logic
- `src/components/` – Shared React components

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](LICENSE)

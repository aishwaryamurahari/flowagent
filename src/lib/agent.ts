import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAgent(emailBody: string) {
  const prompt = `
You are an executive assistant. Read the following email and extract:
- A summary of the task
- Due date (if any)
- Priority (Low/Medium/High)

Respond in JSON like:
{
  "task": "...",
  "dueDate": "...",
  "priority": "..."
}

Email:
"""${emailBody}"""
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  // Log the raw response for debugging
  console.log("OpenAI raw response:", res.choices[0].message.content);

  // Remove code block markers if present
  const raw = res.choices[0].message.content || "";
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    const json = JSON.parse(cleaned);
    return json;
  } catch (err) {
    return { task: "⚠️ Failed to parse agent output.", dueDate: "", priority: "" };
  }
}

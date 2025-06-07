"use server"

import { GoogleGenerativeAI } from '@google/generative-ai';

function convertMarkdownToHTML(text: string): string {
  // Bold: **text**
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Split by lines
  const lines = html.split("\n");

  // Convert bullet points
  const convertedLines = lines.map(line => {
    if (/^\*\s+/.test(line)) {
      return `<li>${line.replace(/^\*\s+/, "")}</li>`;
    }
    return `<p>${line}</p>`;
  });

  // Wrap bullet points in <ul>
  let inList = false;
  const wrapped = convertedLines.reduce((acc, line) => {
    if (line.startsWith("<li>")) {
      if (!inList) {
        acc.push("<ul>");
        inList = true;
      }
      acc.push(line);
    } else {
      if (inList) {
        acc.push("</ul>");
        inList = false;
      }
      acc.push(line);
    }
    return acc;
  }, [] as string[]);

  if (inList) wrapped.push("</ul>");

  return wrapped.join("\n");
}


const genAI = new GoogleGenerativeAI("AIzaSyBEYLbDq7YuTm0uTaSCdXjTWRm1aeqTJ9s");

export async function POST(req: Request) {
  const { topic, gradeLevel } = await req.json();

  const prompt = `
You are a teacher creating a short, age-appropriate lesson for a ${gradeLevel} student.
Topic: "${topic}"

Include:
1. Title
2. Learning Objective
3. 2-3 paragraph Explanation
4. Real-world Example
5. 2 Quiz Questions with Answers
6. Key Takeaways in 3 bullet points
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = convertMarkdownToHTML(result.response.text());

  return new Response(response, { status: 200 });
}
import OpenAI from "openai";
import formatPrompt from "@/utils/formatPrompt";
import parseGPTResponse from "@/utils/parseGPTResponse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = formatPrompt(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;
    const parsed = parseGPTResponse(response);

    return new Response(JSON.stringify(parsed), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

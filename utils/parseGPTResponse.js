export default function parseGPTResponse(text) {
  try {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch {
    return { error: "Failed to parse GPT response as JSON." };
  }
}

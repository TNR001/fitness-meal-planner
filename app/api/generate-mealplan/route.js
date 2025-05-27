// /app/api/generate-mealplan/route.js

// Helper to extract JSON from a string, even if wrapped in a code block
function extractJsonFromString(str) {
  // Match `````` or ``````
  const match = str.match(/``````/i);
  if (match) {
    return match[1];
  }
  // Otherwise, return the string as is
  return str;
}

export async function POST(req) {
  const { user, input, places } = await req.json();

  // Construct the prompt
  const prompt = `
You are a personalized meal planning assistant.

Here is my input:

Current Weight: ${user.current_weight}  
Height: ${user.height}  
Target Weight: ${user.target_weight}  
Body Goal: ${input.goal}  
Weekly Budget (in local currency): ${input.budget}  
Number of Days with Different Meals: ${input.days}  
Dietary Restrictions: ${input.diet || "none"}  
Available Food-Related Places:
${places.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Please generate a structured JSON output with the following format:
{
  "summary": {
    "current_weight_kg": number,
    "height_cm": number,
    "target_weight_kg": number,
    "goal": "bulking/cutting",
    "diet": "e.g., lactose-free",
    "budget": "numerical value or 'unrestricted'",
    "days": number,
    "estimated_daily_calories": number,
    "estimated_daily_protein_grams": number
  },
  "daily_meals": {
    "day_1": {
      "meals": {
        "breakfast": {
          "description": "Meal name or summary",
          "ingredients": [
            { "item": "ingredient name", "quantity": "e.g., 60g, 1 piece" }
          ],
          "calories": number,
          "protein_grams": number
        },
        "lunch": {
          ...
        },
        "dinner": {
          ...
        },
        "snacks": {
          ...
        }
      },
      "total_calories": number,
      "total_protein_grams": number
    },
    ...
    "day_N": { ... }
  },
  "shopping_sources": [
    {
      "place": "Exact name from provided list",
      "type": "grocery/restaurant/bakery/hotel/etc.",
      "address": "if available or extractable",
      "available_items": [
        "item_1", "item_2", ...
      ],
      "used_in_meals": [
        "day_1.breakfast", "day_2.lunch", ...
      ],
      "notes": "e.g., bulk oats, almond milk, vegan snacks"
    },
    ...
  ],
  "estimated_weekly_cost": {
    "food": "X currency",
    "restaurant_meals": "Y currency",
    "total": "Z currency"
  }
}

Output ONLY the JSON, with no commentary or markdown code blocks. Ensure the JSON is valid and well-structured.
`;

  console.log("Prompt sent to ChatGPT:\n", prompt);

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful meal planning assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 10000
    }),
  });

  const data = await openaiRes.json();

  console.log("OpenAI response:", data);

  let plan = null;
  try {
    const content = data.choices[0].message.content;
    const jsonString = extractJsonFromString(content);
    plan = JSON.parse(jsonString);
    console.log("Parsed meal plan:", plan);
  } catch (e) {
    console.error("Failed to parse JSON from OpenAI:", e, "\nContent was:\n", data.choices?.[0]?.message?.content);
    return new Response(JSON.stringify({ error: "Failed to parse JSON", raw: data }), { status: 500 });
  }

  return new Response(JSON.stringify({ plan }), { status: 200 });
}

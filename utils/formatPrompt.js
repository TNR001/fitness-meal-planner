export default function formatPrompt({
  latitude,
  longitude,
  goal,
  distance,
  budget,
  days,
  diet,
}) {
  return `
You are a personalized meal planning assistant.

Here is my input:

Coordinates: (${latitude}, ${longitude})  
Goal: ${goal}  
Distance Willing to Travel: ${distance} km  
Weekly Budget (in local currency): ${budget || "no budget"}  
Number of Days with Different Meals: ${days}  
Dietary Restrictions: ${diet || "none"}

Please provide a structured JSON output with the following format:

{
  "summary": {
    "location": "Nearest city or district based on coordinates",
    "goal": "bulking/cutting",
    "diet": "lactose-free/vegetarian/etc.",
    "budget": "numerical value or 'unrestricted'",
    "travel_range_km": number,
    "days": number
  },
  "daily_meals": {
    "day_1": {
      "meals": {
        "breakfast": {
          "description": "Name and type of meal",
          "ingredients": [
            { "item": "ingredient name", "quantity": "e.g., 100g or 1 piece" },
            ...
          ]
        },
        ...
      },
      "approx_calories": number,
      "approx_protein_grams": number
    },
    ...
    "day_N": { ... }
  },
  "shopping_sources": [
    {
      "name": "Store or restaurant name",
      "type": "grocery/restaurant/market",
      "location": "full address or nearby landmark",
      "distance_km": number,
      "available_items": [
        "item_1",
        "item_2",
        ...
      ],
      "notes": "e.g., lowest price tofu, vegan products, bulk discounts"
    },
    ...
    // Include all available stores and markets within the travel range
  ],
  "estimated_weekly_cost": {
    "food": "X currency",
    "transportation": "X currency",
    "total": "X currency"
  }
}

Please ensure the output is in valid JSON format and includes all the required fields. If any information is not available, please indicate it clearly. The output should be concise and easy to read.
If you need any additional information or clarification, please ask.
Also, the total cost is given in the local currency of the coordinates provided. That includes the cost of food and transportation.
If the user has no budget, please indicate that the user is open to any options available in the area.
`;
}
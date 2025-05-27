import { useState } from "react";

export default function MealPlanForm({ onSubmit }) {
  const [goal, setGoal] = useState("bulking");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState(7);
  const [restrictions, setRestrictions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      goal,
      budget: budget || "no budget",
      days: Number(days),
      diet: restrictions || "none",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-blue-700">Personalized Meal Plan</h2>
      <div>
        <label className="block mb-1 font-medium">Body Goal</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="bulking">Bulking</option>
          <option value="cutting">Cutting</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Weekly Budget</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Amount or 'no budget'"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Number of Days with Different Meals</label>
        <input
          type="number"
          min={1}
          max={7}
          className="w-full border rounded px-3 py-2"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Dietary Restrictions</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., lactose intolerant, vegetarian, none"
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Generate Plan
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

export default function InputForm({ coords, onResult }) {
  const [form, setForm] = useState({
    goal: "bulking",
    distance: 5,
    budget: "",
    days: 3,
    restrictions: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      coordinates: coords,
      goal: form.goal,
      distance_km: form.distance,
      budget: form.budget,
      days: form.days,
      restrictions: form.restrictions,
    };

    const res = await fetch("/api/generate-meal-plan", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    onResult(data); // 🟢 Pass to parent which will save to localStorage
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Fitness Goal:</label>
        <select value={form.goal} onChange={e => setForm({...form, goal: e.target.value})}>
          <option value="bulking">Bulking</option>
          <option value="cutting">Cutting</option>
        </select>
      </div>
      <div>
        <label>Distance (km):</label>
        <input type="number" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} />
      </div>
      <div>
        <label>Weekly Budget:</label>
        <input type="text" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
      </div>
      <div>
        <label>Days with Different Meals:</label>
        <input type="number" value={form.days} onChange={e => setForm({...form, days: e.target.value})} />
      </div>
      <div>
        <label>Dietary Restrictions:</label>
        <input type="text" value={form.restrictions} onChange={e => setForm({...form, restrictions: e.target.value})} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Plan
      </button>
    </form>
  );
}

'use client'

import { useEffect, useState } from 'react'

// Utility to capitalize words
function toTitleCase(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('mealPlan')
    if (stored) setData(JSON.parse(stored))
  }, [])

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">No data found. Please generate a plan first.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Meal Plan</h1>

      {/* Summary Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
          {Object.entries(data.summary).map(([key, value]) => (
            <div key={key}>
              <strong>{toTitleCase(key)}:</strong> {value}
            </div>
          ))}
        </div>
      </section>

      {/* Meals Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Meals</h2>
        {Object.entries(data.daily_meals).map(([day, info]) => (
          <div key={day} className="mb-4 border border-gray-200 rounded p-4">
            <h3 className="font-bold mb-2 capitalize">{day.replace('_', ' ')}</h3>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 text-left border">Meal</th>
                  <th className="px-2 py-1 text-left border">Description</th>
                  <th className="px-2 py-1 text-left border">Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(info.meals).map(([mealName, mealItem]) => (
                  <tr key={mealName}>
                    <td className="px-2 py-1 border">{toTitleCase(mealName)}</td>
                    <td className="px-2 py-1 border">{mealItem.description}</td>
                    <td className="px-2 py-1 border">
                      <ul className="list-disc pl-4">
                        {mealItem.ingredients.map((ing, idx) => (
                          <li key={idx}>
                            {ing.item}: <span className="font-mono">{ing.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
                <tr className="bg-green-50 font-semibold">
                  <td className="px-2 py-1 border">Calories</td>
                  <td className="px-2 py-1 border" colSpan={2}>{info.approx_calories}</td>
                </tr>
                <tr className="bg-blue-50 font-semibold">
                  <td className="px-2 py-1 border">Protein (g)</td>
                  <td className="px-2 py-1 border" colSpan={2}>{info.approx_protein_grams}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* Shopping Sources Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shopping Sources</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-left border">Name</th>
              <th className="px-2 py-1 text-left border">Type</th>
              <th className="px-2 py-1 text-left border">Location</th>
              <th className="px-2 py-1 text-left border">Distance (km)</th>
              <th className="px-2 py-1 text-left border">Available Items</th>
              <th className="px-2 py-1 text-left border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.shopping_sources.map((source, i) => (
              <tr key={i}>
                <td className="px-2 py-1 border">{source.name}</td>
                <td className="px-2 py-1 border">{source.type}</td>
                <td className="px-2 py-1 border">{source.location}</td>
                <td className="px-2 py-1 border">{source.distance_km}</td>
                <td className="px-2 py-1 border">
                  {Array.isArray(source.available_items) ? (
                    <ul className="list-disc pl-4">
                      {source.available_items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="px-2 py-1 border">{source.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Estimated Weekly Cost Section */}
      {data.estimated_weekly_cost && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Estimated Weekly Cost</h2>
          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
            <div>
              <strong>Food:</strong> {data.estimated_weekly_cost.food}
            </div>
            <div>
              <strong>Transportation:</strong> {data.estimated_weekly_cost.transportation}
            </div>
            <div>
              <strong>Total:</strong> {data.estimated_weekly_cost.total}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

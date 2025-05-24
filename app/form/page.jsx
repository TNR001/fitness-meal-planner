'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FormPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    latitude: '',
    longitude: '',
    goal: 'bulking',
    distance: '5',
    budget: 'no budget',
    days: '3',
    restrictions: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/generate-meal-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    localStorage.setItem('mealPlan', JSON.stringify(data))
    router.push('/dashboard')
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Enter Your Fitness Info</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['latitude', 'Latitude'],
          ['longitude', 'Longitude'],
          ['goal', 'Fitness Goal (bulking/cutting)'],
          ['distance', 'Travel Distance (km)'],
          ['budget', 'Weekly Budget'],
          ['days', 'Days with Different Meals (1-7)'],
          ['restrictions', 'Dietary Restrictions (optional)'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              required={key !== 'restrictions'}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Plan
        </button>
      </form>
    </div>
  )
}

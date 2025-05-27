"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import NearbyPlacesByType from "@/components/NearbyPlacesByType";
import MealPlanForm from "@/components/MealPlanForm";
import MealPlanCard from "@/components/MealPlanCard";
import { supabase } from "@/utils/supabaseClient";

const MOCK_USER_ID = "4f577301-d0af-415f-a14c-6c08df33ae40";
const PLACE_TYPES = ["bakery", "cafe", "restaurant", "shopping_mall", "supermarket"];

export default function MealPlansPage() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [formData, setFormData] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [groupedPlaces, setGroupedPlaces] = useState({});
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user profile from Supabase
  async function fetchUserProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("current_weight, height, target_weight")
      .eq("id", MOCK_USER_ID)
      .single();

    if (error || !data) throw new Error("Failed to fetch user profile");
    return data;
  }

  // Fetch nearby places from your API
  async function fetchNearbyPlaces(lat, lng, radius = 1000) {
    const res = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat,
        lng,
        radius,
        maxResultCount: 20,
      }),
    });
    const data = await res.json();
    // If using grouped/allPlaces structure
    return data.allPlaces || [];
  }

  const handleGenerate = async (data) => {
    setFormData(data);
    setShowResults(true);
    setLoading(true);
    setError("");

    try {
      // 1. Fetch user profile
      const user = await fetchUserProfile();
      console.log("Fetched user profile:", user);

      // 2. Get user location
      let userLocation = null;
      if (navigator.geolocation) {
        userLocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
              console.log("Fetched user location:", loc);
              resolve(loc);
            },
            (err) => reject(err)
          );
        });
      } else {
        throw new Error("Geolocation is not supported by your browser.");
      }
      setLocation(userLocation);

      // 3. Fetch nearby places
      const places = await fetchNearbyPlaces(
        userLocation.lat,
        userLocation.lng,
        data.radius || 1000
      );

      console.log("Fetched nearby places:", places);

      // 4. Format places for the prompt
      const formattedPlaces = places.map(
        (p) => `${p.displayName?.text} - ${p.shortFormattedAddress || "N/A"}`
      );

      console.log("Formatted places for prompt:", formattedPlaces);

      // 5. Call your backend to generate the meal plan
      const res = await fetch("/api/generate-mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          input: data,
          places: formattedPlaces,
        }),
      });
      const result = await res.json();
      if (result.plan) {
        setMealPlan(result.plan);
      } else {
        setError("Failed to generate meal plan.");
      }
      setLoading(false);
    } catch (e) {
      setError("Error: " + (e.message || e));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {!showResults ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
              <MealPlanForm onSubmit={handleGenerate} />
            </div>
          </div>
        ) : loading ? (
          <div className="text-blue-600 text-lg">Generating your meal plan...</div>
        ) : mealPlan ? (
          <MealPlanCard mealPlan={mealPlan} />
        ) : null}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Navbar from "@/components/Navbar";

// Use a mock user ID (replace with real user ID once auth is set up)
const MOCK_USER_ID = "4f577301-d0af-415f-a14c-6c08df33ae40";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", MOCK_USER_ID)
        .single();
      setProfile(data || null);
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  console.log("Profile Data:", profile);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Profile</h1>
        <p className="text-red-500">No profile found for this user.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 pt-24">
      <Navbar />
      {/* Profile Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mb-8">
        {/* Avatar & Name */}
        <div className="bg-white shadow rounded-2xl p-8 flex flex-col items-center w-full md:w-1/3">
          <img
            src={profile.avatar_url || "/default-avatar.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-blue-400 mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-900">{profile.full_name || "User"}</h2>
          <span className="text-green-500 mt-2 text-sm font-semibold">
            {profile.membership_status || "Free User"}
          </span>
        </div>
        {/* Bio & Details */}
        <div className="bg-white shadow rounded-2xl p-8 flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Bio & Fitness Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p>
                <span className="font-semibold text-gray-900">Fitness Goal:</span>{" "}
                {profile.fitness_goal || "—"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Diet:</span>{" "}
                {profile.dietary_preferences || "—"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                {profile.city || "—"}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-gray-900">Experience:</span>{" "}
                {profile.experience_level || "—"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Preferred Training:</span>{" "}
                {profile.preferred_training || "—"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Badges:</span>{" "}
                {profile.badges || "—"}
              </p>
            </div>
          </div>
          {profile.bio && (
            <div className="mt-4">
              <p className="italic text-gray-500">"{profile.bio}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Highlights */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* My Meal Plans */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">My Meal Plans</h4>
          {/* Replace with dynamic meal plan data */}
          <ul>
            <li className="flex justify-between py-2 border-b border-gray-200">
              <span>High Protein Plan</span>
              <span className="text-gray-400 text-sm">May 2025</span>
            </li>
            <li className="flex justify-between py-2 border-b border-gray-200">
              <span>Low Carb Plan</span>
              <span className="text-gray-400 text-sm">April 2025</span>
            </li>
          </ul>
        </div>
        {/* My Favorites */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">My Favorites</h4>
          {/* Replace with dynamic favorites data */}
          <div className="flex gap-4 flex-wrap">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🍎</div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🥗</div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🍗</div>
          </div>
        </div>
      </div>
    </div>
  );
}

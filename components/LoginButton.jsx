"use client";
import { supabase } from "@/utils/supabaseClient";

export default function LoginButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google", // or "github", "facebook", etc.
      options: {
            redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
    if (error) console.error(error);
    // The user will be redirected to the provider's login page
  };

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Sign in with Google
    </button>
  );
}

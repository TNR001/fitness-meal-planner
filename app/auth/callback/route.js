import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  // Ensure 'next' is a relative path for security
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = supabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // Local dev: no load balancer, safe to use origin
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Production with load balancer
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  // Error or no code: redirect to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

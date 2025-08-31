"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SigninWithGoogle(redirectTo: string | undefined) {
  const supabase = await createClient();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""); // strip trailing /
  const url = new URL("/auth/callback", baseUrl);
  url.searchParams.set("next", redirectTo || "dashboard");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: url.toString(),
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  redirect(data.url);
}

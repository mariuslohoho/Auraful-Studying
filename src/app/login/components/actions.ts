"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SigninWithGoogle(redirectTo: string | undefined) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${redirectTo || "dashboard"}`,
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

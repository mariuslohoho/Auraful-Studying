"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SignOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/login");
  } else {
    redirect("/error");
  }
}

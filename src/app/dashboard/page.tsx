"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignOut } from "./action";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  // if (error || !data.user) {
  //   redirect("/login");
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back! {data.user?.email}</p>
      <form>
        <button formAction={SignOut}>Logout</button>
      </form>
    </div>
  );
}

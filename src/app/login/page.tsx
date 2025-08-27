"use client";
import { useSearchParams } from "next/navigation";
import { SigninWithGoogle } from "./actions";

export default function Page() {
  const searchparams = useSearchParams();
  const redirectTo = searchparams.get("redirectTo") as string | undefined;

  return (
    <div>
      <form>
        <button formAction={() => SigninWithGoogle(redirectTo)}>Sign In With Google</button>
      </form>
    </div>
  );
}

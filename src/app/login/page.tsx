"use client";
import { SigninWithGoogle } from "./actions";

export default function Page() {
  return (
    <div>
      <form>
        <button formAction={SigninWithGoogle}>Sign In With Google</button>
      </form>
    </div>
  );
}

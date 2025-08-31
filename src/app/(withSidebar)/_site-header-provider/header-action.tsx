// header-action.tsx
"use client";

import { ReactNode, useEffect, useId } from "react";
import { useHeader } from "./header_context";

export function HeaderAction({ children }: { children: ReactNode }) {
  const id = useId();
  const { register, unregister } = useHeader();

  useEffect(() => {
    register(id, children);
    return () => unregister(id);
  }, [id, children, register, unregister]);

  return null;
}

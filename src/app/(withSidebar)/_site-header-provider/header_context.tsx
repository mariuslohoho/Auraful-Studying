"use client";
import React, { createContext, useCallback, useContext, useState } from "react";

type HeaderContext = {
  register: (id: string, action: React.ReactNode) => void;
  unregister: (id: string) => void;
  actions: React.ReactNode[];
};

const HeaderContext = createContext<HeaderContext | undefined>(undefined);

export const useHeader = () => {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw Error("useHeader must be used inside HeaderProvider");
  return ctx;
};

interface HeaderProviderProps {
  children: React.ReactNode;
}

export default function HeaderProvider({ children }: HeaderProviderProps) {
  const [map, setMap] = useState<Record<string, React.ReactNode>>({});
  const register = useCallback((id: string, action: React.ReactNode) => {
    setMap((prev) => ({ ...prev, [id]: action }));
  }, []);

  const unregister = useCallback((id: string) => {
    setMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return (
    <HeaderContext.Provider value={{ unregister, register, actions: Object.values(map) }}>{children}</HeaderContext.Provider>
  );
}

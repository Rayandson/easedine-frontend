import React from "react";
import { createContext, useState } from "react";

type PageProviderProps = {
    children: React.ReactNode
}

export type PageContextType = {
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>
}

export const PageContext = createContext<PageContextType | null>(null);

export function PageProvider({ children }: PageProviderProps) {
  const [page, setPage] = useState<string>("home");

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

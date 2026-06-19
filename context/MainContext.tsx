"use client";

import { currentUserType } from "@/types/main";
import { createContext, useContext, ReactNode } from "react";

interface MainContextType {
  currentUser: currentUserType;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: currentUserType;
}) => {
  return (
    <MainContext.Provider value={{ currentUser }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context)
    throw new Error("useMainContext must be used within MainProvider");
  return context;
};

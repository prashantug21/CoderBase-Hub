"use client";  // Mark it as a client component

import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { useRef } from "react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;

"use client";  // Mark it as a client component

import { Provider } from "react-redux";
import { store } from "../redux/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

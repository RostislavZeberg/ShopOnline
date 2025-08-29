"use client"; // Обязательно в Next.js, если используются хуки

import { Provider } from "react-redux";
import { store } from "@/store/store"; // Ваш Redux-store

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
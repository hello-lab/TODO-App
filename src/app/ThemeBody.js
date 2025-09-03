"use client";
import { useEffect } from "react";

function getCookie(name) {
  if (typeof document === "undefined") return ""; // SSR guard
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

export default function ThemeBody({ children, className }) {
  useEffect(() => {
    const theme = getCookie("theme");
    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("light");
    }
  }, []);
  return <>{children}</>;
}
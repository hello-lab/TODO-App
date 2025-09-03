"use client"
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}


export default function Home() {
  const [isDark, setIsDark] = useState(getCookie("theme") === "dark");

  const handleThemeChange = (checked) => {
    setIsDark(checked);
   window.location.reload();
    document.cookie = `theme=${checked ? "dark" : "light"}; path=/`;
  };

  return (
    <div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/profile.svg"
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full bg-primary border-2 border-gray-300"
          />
          Hi <h1 className="text-2xl font-bold">{getCookie("email")}</h1>
          <p className="text-gray-600">{getCookie("email")}</p>
          <div className="mt-4">
            <Switch checked={isDark} onCheckedChange={handleThemeChange} />
          </div>
        </div>
      </main>
    </div>
  );
}

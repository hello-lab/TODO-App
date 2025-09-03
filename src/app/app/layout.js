"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { Toaster } from "react-hot-toast";
import { Image } from "next/app"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const navItems = [
    { path: "/app/home", icon: "/home.svg", bg: "primary" },
    { path: "/files", icon: "/file.svg", bg: "bg-chart-2" },
    { path: "/account", icon: "/account.svg", bg: "bg-chart-4" },
  ];
  useEffect(() => {
    const currentNavItem = navItems.find(item => item.path === pathname);
    if (currentNavItem) {
      document.body.classList.add(currentNavItem.bg);
    }
  }, [pathname]);
  return (
   
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden flex-row`}>
        <Toaster />
        <div className="w-screen flex flex-row bg-background preserve-3d">
          <div className="relative w-[10vw] h-screen flex flex-col  items-left  py-4 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="relative flex justify-left items-center mb-5 ">
               <div className="flex items-center translate-x-[-20px] pr-[10px]">
                <div
                  className={`h-1 bg-gray-300 rounded`}
                  style={{
                    width: "40px",
                    transform: ` translateX(15px)`,
                  }}
                /> <div className="w-[3vh] h-[2vh] rounded-[1vh] bg-black" /></div>
              </div>
            ))}
          </div>
          <div className="w-[80vw]  bg-background" >
           <div><div>{children}</div></div> 
          </div>
          
        </div>
        <div className="right-0 top-0 absolute h-[100vh] z-[0] w-[10vw] bg-primary">
<div >
<div className={`nav flex flex-col  py-4 w-[8vw] items-center justify-center h-full space-y-1 translate-x-[-2vw]`}>
  <div onClick={() => {router.push("/app/home") }} className={`w-[15vw] h-[12vh]  flex items-center opacity-[80%] justify-end bg-chart-1 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out    active:scale-95 active:shadow-inner    cursor-pointer select-none  ${pathname === "/app/home" ? " " : "filter-[brightness(0.5)]"}`}>
    {/* SVG placeholder */}
<img src="/home.svg" width={"90vw"} alt="Description" />
  </div>
  <div onClick={() => {router.push("/app/todo") }} className={`w-[15vw] h-[12vh] flex items-center opacity-[80%] justify-end bg-chart-2 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out outset   active:scale-95 active:shadow-inner    cursor-pointer select-none  ${pathname === "/app/todo" ? " " : "filter-[brightness(0.5)]"}`}>
    {/* SVG placeholder */}
<img src="/documentnormal.svg" width={"90vw"} alt="Description" />
  </div>
  <div onClick={() => {router.push("/app/todoai") }} className={`w-[15vw] h-[12vh] flex items-center opacity-[80%] justify-end bg-chart-5 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out outset   active:scale-95 active:shadow-inner    cursor-pointer select-none  ${pathname === "/app/todoai" ? " " : "filter-[brightness(0.5)]"}`}>
    {/* SVG placeholder */}
<img src="/file.svg" width={"90vw"} alt="Description" />
  </div>
  <div onClick={() => {router.push("/app/account") }} className={`w-[15vw] h-[12vh] flex items-center opacity-[80%] justify-end bg-chart-4 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out outset   active:scale-95 active:shadow-inner    cursor-pointer select-none  ${pathname === "/app/account" ? " " : "filter-[brightness(0.5)]"}`}>
    {/* SVG placeholder */}
<img src="/account.svg" width={"90vw"}   alt="Description" />
  </div>
</div>

</div>

          </div>
      </div>
   
  );
}

"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";





function setCoookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
    


export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState('Guest');
  const [password, setPassword] = useState('');
const router = useRouter();

const guestmd=async (e) =>{
  e.preventDefault();
  setUsername('Guest');
 setCoookie("email", username);
      toast.success('Login successful');
      window.location.href = '/app/home'
}
  const handleLogin = async (e) => {
    e.preventDefault();
    toast.loading('Waiting...');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username:username, password: password }),
    });

    

    const data = await res.json();
    toast.dismiss()
    if (data.message=='Login successful'||username=='Guest'){
      setCoookie("email", username);
      toast.success('Login successful');
      window.location.href = '/app/home'
    }
    else{
      toast.error(data.message);
  };
}

  return (
    <div
      className={cn("flex text-[2.5rem] flex-col w-[100%] font-hand ", className)}
      {...props}
    >
      <div className="relative flex flex-col  h-[100vh] justify-center bg-background  rounded-lg border bg-[length:100%_2.5rem] bg-[linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)] text-card-foreground shadow-sm p-10 w-[100dvw] sm:p-8 w-full sm:h-[90vh]">
        
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 pointer-events-none"></div>

        <div className="font-hand font-bold text-center ">
          <div className="text-[4.0rem] absolute top-[5vh]   text-center md:text-[10vh]">Welcome back</div>
<br />
          
          <br />
                    <br />

          <form className="grid gap-8 translate-y-[-8.0rem]">
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center flex-row gap-4 w-[85vw]">
                <span>Email:</span>
                <input
                  className="flex-1 max-w-[60vw] rounded-md px-3 py-2 text-2xl bg-transparent"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex    gap-4">
                <div className="flex items-center gap-4">
                  <span>Pass:&nbsp;</span>
                  <input
                    className="flex-1 max-w-[60vw] rounded-md px-3 py-2 text-2xl bg-transparent"
                    id="password"
                    type="password"
                    placeholder="********"
                    
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
               
              </div>
               <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span></span>
                  &nbsp;
                </div>
               
              </div>
<div className="flex flex-row w-[90dvw]  items-center justify-center  sm: gap-4">
              <Button type="submit" className="w-max p-6  text-[3vh] " onClick={handleLogin}>
                Login
              </Button>
               <Button onClick={guestmd} className="w-max p-6  text-[3vh] bg-gray-800">
                Guest Mode
              </Button></div>
            </div>

            
          </form>
          <div className="w-full cursor-pointer flex items-center justify-center">
            <div  className="w-max translate-y-[-10vh]  p-2 text-2xl sm:p-6" onClick={props.togglesignup}>
            {`Don't have an account? Sign up`}
          </div>
          </div>
        </div>
        
      </div>
    
     
    </div>
  );
}

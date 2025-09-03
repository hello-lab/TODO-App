"use client";
import { GalleryVerticalEnd } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { use, useState } from "react";
import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
export default function LoginPage() {
  const [togglestate, setTogglestate] = useState(false);
  const [togglestate1, setTogglestate1] = useState(true);
  const togglesignup = () => {
    setTogglestate(!togglestate);
    setTimeout(() => {
      setTogglestate1(!togglestate1);
    }, 1000);
  }
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    toast.loading('Waiting...');
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username:username, password: password }),
    });

    const data = await res.json();
    toast.dismiss()
    console.log(data)
    try{
      data=='User Created' ? toast.success('User created successfully') : toast.error('User Exists');
    }
    catch(e){toast.error(e)}
  };


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
    if (data.message=='Login successful'){
      toast.success('Login successful');
      window.location.href = '/app/home'
    }
    else{
      toast.error(data.message);
  };
}

  return (
    <div className="bg-primary flex min-h-[100dvh] flex-col items-center justify-center   sm:p-10">
      <div className="flex w-full flex-col justify-center relative">
        <div className="perspective-1000 transform-style-3d flex  min-h-[10vh] items-center sm:min-h-[80vh]">
          <div className={`transition-transform   ${togglestate ? "animate-[rotate3d-animation_2s_ease-in-out]  z-[0]" : "animate-[rotate3d-animation1_2s_ease-in-out]  z-[1]"} absolute right-0 ${togglestate1?"transform-x-[-100%] z-[1]":"transform-x-[-100%] rotate-y-180 z-[0]"} z-1000 flex  justify-right min-w-[200%]`}>
           <span className="w-[50%]  translate-x-[100%]  ">
            <LoginForm togglesignup={togglesignup} />
             
            </span>
          </div>
          <div className="absolute w-[100%] z-[0] flex items-center justify-center">
            <SignUpForm togglesignup={togglesignup}  />
          </div>
         
        </div>
      </div>
    </div>
  );
}

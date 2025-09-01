import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {toast} from "react-hot-toast"
import { useState } from "react";
export function SignUpForm({ className, ...props }) {
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


 
  return (
    <div
      className={cn("flex text-[2.5rem] bg-white-900 flex-col w-[100%] font-hand gap-6", className)}
     
    >
      <div className="relative flex flex-col w-full rounded-lg border bg-[length:100%_2.5rem] bg-[linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)] text-card-foreground shadow-sm p-10 sm:p-8">
        
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 pointer-events-none"></div>

        <div className="font-hand font-bold text-center ">
          <div className="text-[4.0rem] absolute  text-center translate-y-[-1.3rem]">Welcome to the Club</div>
          <br />
          
          <br />
          <form className="grid gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span>Email:</span>
                <input
                  className="flex-1 border rounded-md px-3 py-2 text-2xl bg-transparent"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span>Password:</span>
                  <input
                    className="flex-1 border rounded-md px-3 py-2 text-2xl bg-transparent"
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
               
              </div>
              
<div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span>Confirm Password:</span>
                  <input
                    className="flex-1 border rounded-md px-3 py-2 text-2xl bg-transparent"
                    id="confirm-password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
               
              </div>
              

<div className="flex flex-row w-full justify-center gap-4">
              <Button type="submit" className="w-max p-8  text-3xl" onClick={handleSignup}>
                Sign Up
              </Button>
              </div>
            </div>

            
          </form>
          
          <Button  className="w-max p-6 text-2xl" onClick={props.togglesignup}>
            {`Already have an account? Log in`}
          </Button>
        </div>
      </div>

   
    </div>
  );
}

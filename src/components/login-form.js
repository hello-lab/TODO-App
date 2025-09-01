import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LoginForm({ className, ...props }) {
  return (
    <div
      className={cn("flex text-[2.5rem]  flex-col w-[100%] font-hand ", className)}
      {...props}
    >
      <div className="relative flex flex-col  bg-[white] w-full rounded-lg border bg-[length:100%_2.5rem] bg-[linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)] text-card-foreground shadow-sm p-10 sm:p-8">
        
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 pointer-events-none"></div>

        <div className="font-hand font-bold text-center ">
          <div className="text-[4.0rem] absolute  text-center translate-y-[-1.3rem]">Welcome back</div>
          <br />
          
          <br />
          <form className="grid gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span>Email:</span>
                <input
                  className="flex-1  rounded-md px-3 py-2 text-2xl bg-transparent"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span>Password:</span>
                  <input
                    className="flex-1  rounded-md px-3 py-2 text-2xl bg-transparent"
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
               
              </div>
               <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span></span>
                  &nbsp;
                </div>
               
              </div>
<div className="flex flex-row w-full justify-center gap-4">
              <Button type="submit" className="w-max p-8  text-3xl">
                Login
              </Button>
               <Button type="submit" className="w-max p-8  text-3xl bg-gray-800">
                Guest Mode
              </Button></div>
            </div>

            
          </form>
            <Button  className="w-max p-6 text-2xl" onClick={props.togglesignup}>
            {`Don't have an account? Sign up`}
          </Button>
        </div>
        
      </div>
    
     
    </div>
  );
}

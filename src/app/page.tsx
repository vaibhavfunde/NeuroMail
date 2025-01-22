

// import { Button } from "@/components/ui/button";


// export default async function Home() {
//  return (
//   <Button>Hello World</Button>
//  )
// }


"use client";

import LinkAccountButton from "@/components/link-account-button";
import { Button } from "@/components/ui/button";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";


export default function Home() {

  const { user } = useUser();

  if (!user) {
    return (
       <div className='flex justify-center items-center h-screen'>
             <SignUp />
       </div>
     )
  }
  
  

  return <LinkAccountButton></LinkAccountButton>;
}

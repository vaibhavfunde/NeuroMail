


import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { getAurinkoToken ,getAccountDetails } from "@/lib/aurinko";
//  import {waitUntil} from '@vercel/functions';
import { waitUntil } from '@vercel/functions'
import axios from "axios";


export const GET = async (req: NextRequest) => {
 const { userId } = await auth();

 if (!userId) {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 const params = req.nextUrl.searchParams;
 const status = params.get("status");

 if (status !== "success") {
  // console.error("Account linking failed - status not success");
   return NextResponse.json({ message: "Failed to link account" }, { status: 401 });
 }

 const code = params.get("code");
 console.log("Received code:", code);
 if (!code) {
   //console.error("No code received from Aurinko");
   return NextResponse.json({ error: "No code provided" }, { status: 400 });
 }

 try {
   const token = await getAurinkoToken(code);
  console.log(token)
   if (!token) {
     return NextResponse.json({ message: "Failed to exchange code for token" }, { status: 500 });
   }

   console.log("Token received:", token);

   const accountDetails = await getAccountDetails(token.accessToken);
   console.log("Fetched Account Details:", accountDetails);
   console.log(accountDetails.email);
   const email = accountDetails.email;  // e.g. "vaibhavfunde84@gmail.com"
   const firstName = email.split("@")[0].replace(/[0-9]/g, '');  // Removes digits, leaving "vaibhavfunde"
   
   console.log("Extracted first name:", firstName);  // Output will be: "vaibhavfunde"
   

   await db.account.upsert({
     where: { id: token.accountId.toString() },
    
     update: {
       accessToken: token.accessToken,
     },
     create: {
       id: token.accountId.toString(),
       userId,
       
       emailAddress: accountDetails.email,
       // name: accountDetails.name,
       name: firstName,
       accessToken: token.accessToken,
     },
    });


    //trigger initial sync endpoint
    console.log("accountId:", token.accountId.toString());
    console.log("userId:", userId);
    console.log("API URL: ", process.env.NEXT_PUBLIC_URL);

    await waitUntil(
      axios.post(`http://localhost:3000/api/initial-sync`, {
        accountId: token.accountId.toString(),
        userId: userId.toString(),
      })
      .then((res) => {
        console.log("Initial sync response:", res.data);
      })
      .catch((err) => {
        console.error("Initial sync error:", err);
      })
    );

   return NextResponse.redirect(new URL("/mail", req.url));

 } catch (error) {
  // console.error("Error during account linking:", error);
   return NextResponse.json({ message: "Failed to link account" }, { status: 500 });
 }

// return NextResponse.json({ message: "Account linking successful" }, { status: 200 });
};


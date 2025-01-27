

// api initial sync

import { db } from "@/server/db";
import { error } from "console";
// import Account from ''

import { NextRequest, NextResponse } from "next/server";


export const post = async (req: NextRequest) => {
    const body = await req.json()
    const { accountId, userId } = body
 if(!accountId || !userId){
    return NextResponse.json({error:'Missing accountId or userId'}, { status: 400 });
 }
 
 const dbAccount = await db.account.findUnique({
    where: {
        id: accountId,
        userId
    }
 })
 if(!dbAccount){
    return NextResponse.json({error:'Account not found'}, { status: 404 }); 
 }

 console.log("dbAccount",dbAccount);
 
//  //perform initial sync
//  const account = new Account(dbAccount.accessToken)
//  const response = await account.performInitialSync();
//  if(!response){
//     return NextResponse.json({error:'Failed to perform initial sync'}, { status: 500 });
//  }
 
//  const {emails,deltaToken} = response;
//  console.log("emails",emails);


//  await db.account.update({
//     where: {
//         id: accountId,
//     },
//     data: {
//         nextDeltaToken: deltaToken
//     },
// });

// await syncEmailsToDatabase(emails);
return NextResponse.json({ message: 'Initial sync successful' }, { status: 200 });
console.log('initial sync completed' );
return NextResponse.json({success: true}, { status: 200 });
}



 

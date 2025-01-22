"use server";

import { auth } from '@clerk/nextjs/server';


export const getAurinkoAuthorizationUrl = async (serviceType: 'Google' | 'Office365') => {
    const  userId  = await auth();
    console.log(userId);
    // console.log("Client ID:", process.env.AURINKO_CLIENT_ID);
    // console.log("Return URL:", process.env.NEXT_PUBLIC_URL);
    
       if (!userId) throw new Error('User not found')

        const params = new URLSearchParams({
            clientId: process.env.AURINKO_CLIENT_ID as string,
            serviceType,
            scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
            response_type: 'code',
            returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
        });
        // console.log(params.toString());

   

    return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};




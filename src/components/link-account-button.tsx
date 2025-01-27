"use client"

import React from "react"
import { Button } from "@/components/ui/button";

import { getAurinkoAuthorizationUrl } from "@/lib/aurinko"

const LinkAccountButton = () => {
    return (
        <Button onClick={async () => {
            const authUrl = await getAurinkoAuthorizationUrl('Office365');
            // console.log("authUrl:", authUrl);
            window.location.href = authUrl;
        }}>
            Link Account12
        </Button>
        
    )
}

export default LinkAccountButton;
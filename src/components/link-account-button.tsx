"use client"

import React from "react"
import { Button } from "@/components/ui/button";

import { getAurinkoAuthorizationUrl } from "@/lib/aurinko"

const LinkAccountButton = () => {
    return (
        <Button onClick={async () => {
            const authUrl = await getAurinkoAuthorizationUrl('Google');
            console.log("authUrl:", authUrl);
        }}>
            Link Account12
        </Button>
        
    )
}

export default LinkAccountButton;
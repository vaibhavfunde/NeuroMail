// src/app/api/initial-sync.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Initial sync API hit");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { accountId, userId } = req.body;

  try {
    // Example operation: update sync status in the database
    await db.account.update({
      where: { id: accountId },
      data: { syncStatus: "initial_sync_complete" },
    });

    res.status(200).json({ message: "Initial sync successful" });
  } catch (error) {
    console.error("Initial sync error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


import { db } from "./server/db";




await db.user.create({
    data: { 
       emailAddress: "lX6m1@example.com",
        firstName :"eloift ",
        lastName: "jackson"

    }
})

console.log("done")
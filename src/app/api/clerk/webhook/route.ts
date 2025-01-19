// //api/clerk/webhook 

// import { db } from "@/server/db";


// export const POST = async (req: Request) => {
//     const {data} = await req.json();
//     console.log('clerk webhook received',data);
//     const emailAddress = data.email_addresses[0]?.email_address;

//     const firstName = data.first_name;
//     const lastName = data.last_name;
//     const imageUrl = data.image_url;
//     const id = data.id;
//     await db.user.create({
//         data: {
//             id:id,
//             emailAddress: emailAddress,
//             firstName: firstName,
//             lastName:lastName,
//             imageUrl: imageUrl,
            
//         }
//     })
//     console.log("user created")
//     return new Response('webhook received' ,{status:200});
// } 


import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json();
    console.log('clerk webhook received', data);

    const emailAddress = data.email_addresses[0]?.email_address;  // Access email address from array
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    if (!emailAddress) {
        return new Response('Email address is missing', { status: 400 });
    }

    try {
        await db.user.create({
            data: {
                id: id,
                emailAddress: emailAddress,  // Ensure email address is correctly passed
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl,
            }
        });
        console.log("user created");
        return new Response('Webhook received', { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Internal server error', { status: 500 });
    }
};

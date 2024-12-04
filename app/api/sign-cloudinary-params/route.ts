import { v2 as cloudinary } from "cloudinary"


cloudinary.config({

    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET,

});

export async function POST(request: Request) {

    const body = await request.json();

    // Get the params to sign from the request body.

    // This is something that we don't need to worry about as it will come

    // from the upload widget

    const { paramsToSign } = body;

    // Get the signature with the api_sign_request method, passing the params to sign and the api secret

    const signature = cloudinary.utils.api_sign_request(

        paramsToSign,

        process.env.CLOUDINARY_API_SECRET as string

    );

    // Return the signature

    return Response.json({ signature });

}
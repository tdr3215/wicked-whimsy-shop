"use server"
import { CldImageProps } from "next-cloudinary";
import getCloudinary from "./getCloudinary";


const handleMultiFileUpload = async (value: any) => {
    const cloudinary = await getCloudinary()
    const resources = await cloudinary.uploader.upload(value).then(result => {
        return result
    })

    return resources
};

export default handleMultiFileUpload
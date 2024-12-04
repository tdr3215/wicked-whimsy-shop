// "use server"
import getCloudinary from "./getCloudinary";


const handleMultiFileUpload = async () => {
    const cloudinary = await getCloudinary()


    const { resources } = await cloudinary.search.expression(`'resource_type:image AND AND uploaded_at<1m`)
        .execute();

    return resources
};

export default handleMultiFileUpload
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import MultiImageUpload from "./MultiImageUpload";
import handleMultiFileUpload from "@/lib/upload/handleMultiFileUpload";

interface ImageUploadProps {
  value: string[];
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  uploadedImages: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  uploadedImages,
}) => {
  const onSuccess = (result: any) => {
    if (typeof result.info === "object" && "secure_url" in result.info) {
      handleMultiFileUpload(result.info.secure_url);
      onChange(result.info.secure_url);
    }
  };

  /*
! Fix Multiple Images not loading onUpload
https://cloudinary.com/blog/next-js-cloudinary-upload-transform-moderate-images
  */
  // const onSuccess = async (result: any) => {
  //   try {
  //     console.log(result);
  //     const resources = await handleMultiFileUpload();
  //     value = resources;
  //     return "done";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const images = handleMultiFileUpload();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {uploadedImages.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size={"sm"}
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <MultiImageUpload
        className={
          "bg-green-400 text-white rounded-xl hover:bg-pink-300 h-8 w-20"
        }
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset="iz0ftvur"
        onSuccess={onSuccess}
        options={{
          multiple: true,
          maxFiles: 20,
          tags: [`images`],
        }}
      />

      {/* <CldUploadWidget
        uploadPreset="iz0ftvur"
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={onSuccess}
        options={{
          multiple: true,
          maxFiles: 20,
        }}
      >
        {({ open }) => {
          return (
            <Button
              className={"bg-pink-400 text-white rounded-xl hover:bg-pink-300"}
              onClick={() => open()}
            >
              <Plus className="h-4 w-4 mr-2" /> Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export default ImageUpload;

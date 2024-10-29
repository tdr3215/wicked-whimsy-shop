/* eslint-disable @typescript-eslint/no-explicit-any */
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, i) => (
          <div key={i} className="relative w-[200px] h-[200px]">
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
      <CldUploadWidget uploadPreset="iz0ftvur" onSuccess={onSuccess}>
        {({ open }) => {
          return (
            <Button className={"bg-green-2 text-white"} onClick={() => open()}>
              <Plus className="h-4 w-4 mr-2" /> Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

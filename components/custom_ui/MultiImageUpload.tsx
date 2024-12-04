"use client";

import { CldUploadButton, type CldUploadButtonProps } from "next-cloudinary";

function MultiImageUpload(props: CldUploadButtonProps) {
  return <CldUploadButton {...props} />;
}

export default MultiImageUpload;

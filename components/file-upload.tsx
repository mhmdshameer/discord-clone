import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [fileData, setFileData] = useState<{ url?: string; name?: string }>({
    url: value,
    name: "", 
  });

  const handleUploadComplete = (res: any) => {
    console.log("Upload Response:", res);
    const uploadedFile = res?.[0];
    setFileData({
      url: uploadedFile?.url,
      name: uploadedFile?.name,
    });
    onChange(uploadedFile?.url);
  };

  const fileType = fileData?.name?.split(".").pop();
  console.log("fileType:", fileType);

  if (fileData?.url && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={fileData?.url} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (fileData?.url && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
        <a href={fileData?.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
          {fileData?.name}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          console.log("error Dropzone", error);
        }}
      />
    </div>
  );
};

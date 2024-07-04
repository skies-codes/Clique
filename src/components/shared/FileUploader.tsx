import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "../../lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    console.log(fileUrl);
    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [fieldChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className='flex flex-center flex-col bg-gray-200 dark:bg-dark-3 rounded-xl cursor-pointer'
        >
            <input {...getInputProps()} className='cursor-pointer' />

            {fileUrl ? (
                <>
                    <div className='flex justify-center p-5 md:px-20'>
                        <img
                            src={fileUrl}
                            alt='image'
                            className='w-full h-full object-cover rounded-3xl'
                        />
                    </div>
                    <p className='file_uploader-label'>
                        Click or drag photo to replace
                    </p>
                </>
            ) : (
                <div className='file_uploader-box '>
                    <img
                        src='/assets/icons/file-upload.svg'
                        width={96}
                        height={77}
                        alt='file upload'
                    />

                    <h3 className='text-base mb-2 mt-6 text-slate-500'>
                        Drag photo here
                    </h3>
                    <p className='text-sm mb-6 text-slate-500'>SVG, PNG, JPG</p>

                    <Button type='button' className='shad-button_dark_4'>
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;

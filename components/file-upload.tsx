"use client"
import {X} from "lucide-react"
import Image from 'next/image'
import {UploadDropzone} from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange : (url?:string)=>void;
    value : "string",
    endpoint : "serverImage" | "messageFile"
}
export const FileUpload = ({onChange, value, endpoint} : FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if(value && fileType!== 'pdf'){
        return <div className="flex justify-center items-center">
            <div className="relative h-20 w-20 flex item-center justify-center">
            <Image
            fill
            src={value}
            alt="upload"
            className="rounded-full"
            />
            <button
            onClick = {()=>{onChange("")}}
            className="bg-rose-500 text-white p-[2px] rounded-full absolute top-0 right-0">
            
            <X h-4 w-4/>

            </button>
        </div>
            </div>
    }
    return (
        <UploadDropzone
        className="p-0"
        endpoint={endpoint}
        onClientUploadComplete = {(res) => {
            onChange(res?.[0].url);
        }}
        onUploadError = {(error:Error) => {
            console.log(error)
        }}
        />
    )
}
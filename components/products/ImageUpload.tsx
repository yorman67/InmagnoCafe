"use client"

import { getImagePath } from "@/src/util"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({image}: {image?: string}) {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            uploadPreset="bnhkgfio"
            onSuccess={(result, { widget }) => {
                widget.close()
                if (result.event === 'success') {
                    //@ts-ignore
                    setImageUrl(result.info.secure_url)
                }
            }}
            options={{
                maxFiles: 1,
            }}
        >
            {
                ({ open }) => (
                    <>
                        <div className="space-y-2">
                            <label className="text-slate-800" htmlFor="image">imagen de producto</label>
                            <div
                                className=" relative flex items-center justify-center w-full p-10 border-2 border-dashed rounded-md"
                                onClick={() => open()}
                            >
                                <TbPhotoPlus
                                    size={50}
                                    />
                                <p className='text-lg font-semibold'>agregar imagen</p>
                                {imageUrl && (
                                    <div
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image
                                            src={imageUrl}
                                            style={{ objectFit: 'contain' }}
                                            alt="image"
                                            fill
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {image && !imageUrl && (
                            <div className="space-y-2">
                                <label> imagen actual </label>
                                <div className="relative w-64 h-64">
                                    <Image
                                        src={getImagePath(image)}
                                        style={{ objectFit: 'contain' }}
                                        alt="image"
                                        fill 
                                    />
                                </div>
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="image"
                            defaultValue={imageUrl ? imageUrl : image} 
                        />
                    </>

                )}
        </CldUploadWidget>
    )
}

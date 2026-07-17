import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_API_SECRET 
        })


        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("Upload successful",response)

        // delete temp file after upload
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {

        if (fs.existsSync(localFilePath)) 
        fs.unlinkSync(localFilePath)
        console.error(`[Cloudinary Upload Error] Failed to upload local file: ${localFilePath}`)
        console.error(error)
        return null
    }
}

const getPublicIdFromUrl= (url)=>{
    try{
        if(!url) return null

        const parts=url.split("/")
        const fileName= parts[parts.length-1]
        const publicId = fileName.split(".")[0]
        return publicId
    }
    catch (error) {
        console.error(`[Cloudinary URL Parser Error] Failed to extract ID from URL: ${url}`)
        console.error(error)
        return null
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return

        cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_API_SECRET 
        })

        const publicId = getPublicIdFromUrl(imageUrl)
        if (!publicId) return

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto"
        })

    } catch (error) {
        console.error(`[Cloudinary Delete Error] Failed to delete image: ${imageUrl}`)
        console.error(error)
    }
}


export {
    uploadOnCloudinary,
    deleteFromCloudinary
}
import multer from "multer"
const storage = multer.diskStorage({
    
    destination: 
        function(req,file,cb)
        {
            cb(null,"./public/temp")
        }
    ,
    filename:
        function(req,file,cb)
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only .jpeg, .png, and .webp format allowed!"), false)
    }
}

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})
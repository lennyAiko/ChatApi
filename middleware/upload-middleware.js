import multer from 'multer' 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: async (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg')  cb(null, true)
    else cb(null, false)
}

export const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 // only accept 5mb
    },
    fileFilter: fileFilter
})
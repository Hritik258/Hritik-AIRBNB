import multer from "multer"
import fs from "fs"

// ✅ Create uploads folder if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads")
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads") // ✅ was "./public" which doesn't exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname) // ✅ added timestamp to avoid duplicate filenames
  }
})

const upload = multer({ storage })

export default upload
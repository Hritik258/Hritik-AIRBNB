import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { addlisting, getListing, findListingById, deleteListing, updateListing, addRating } from "../controllers/listing.controller.js"

let listingRouter = express.Router()

listingRouter.post("/addlisting", isAuth, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 }
]), addlisting)

listingRouter.get("/getlisting", getListing)
listingRouter.get("/findlistingbyid/:id", findListingById)
listingRouter.delete("/delete/:id", isAuth, deleteListing)
listingRouter.put("/update/:id", isAuth, updateListing)
listingRouter.post("/rate/:id", isAuth, addRating)

export default listingRouter
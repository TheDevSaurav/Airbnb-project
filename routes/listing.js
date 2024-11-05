const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expressErr.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage })

const{isLoggedIn,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(","); 
        throw new ExpressError(400,result.errMsg);
    }
    else{
        next();
    }
}

//index 
router.route("/")
.get( wrapAsync(listingController.index) )
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListings));


 //new route
 router.get("/new",isLoggedIn,listingController.renderNewForm);

  
router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListings))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListings));

 //edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEdit)); 

// //index route
// router.get("/", wrapAsync(listingController.index) );
 
 

 
//  //show route
//  router.get("/:id",wrapAsync(listingController.showListings));
 
//  //create route
//  router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListings));
 

 
//  //update route
//  router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListings));
 
//  //delete route
//  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListings));

 module.exports = router;
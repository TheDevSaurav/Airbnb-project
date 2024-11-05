const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 };
 module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.showListings = async(req,res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id).populate("owner");
     if(!listing){
       req.flash("error","Listing not exists!");
       res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
};
module.exports.createListings = async(req,res)=>{
    //let {title,description,image,price,country,location} = req.body;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listing");
    // }
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename}; 
        await newListing.save();
        req.flash("success","new Listing is Created!");
        res.redirect("/listings");

};

module.exports.renderEdit = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListings = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing is Updated!");
    res.redirect(`/listings/${id}`);

};

module.exports.deleteListings = async(req,res)=>{
    let {id} = req.params;
    let deletedLisiting = await Listing.findByIdAndDelete(id);
    console.log(deletedLisiting);
    req.flash("success","Listing is Deleted!");
    res.redirect("/listings");
};
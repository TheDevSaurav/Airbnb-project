
const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs"); 
};
module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Registered Successfully");
        res.redirect("/listings");
    });
    }
    catch(err){
        req.flash("success","User Exists");
        res.redirect("/signup");
    }
};
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login = async(req,res)=>{
    req.flash("success","welcome back to airbnb");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged Out !!");
        res.redirect("/listings");
    })
};
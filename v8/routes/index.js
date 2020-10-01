var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

//ROOT ROUTE
router.get("/", function(request, response){
	response.render("landing");
});


//============Authentication Routes============
// SHOW REGISTER FORM ROUTE
router.get("/register", function(request, response){
	response.render("register");
});

//HANDLE SIGN-UP LOGIC ROUTE
router.post("/register", function(request, response){
	var newUser=new User({username: request.body.username});
	User.register(newUser, request.body.password, function(err, user){
		if(err){
			console.log(err);
			return response.render("register");
		}
		passport.authenticate("local")(request, response, function(){
		response.redirect("/campgrounds");
		});
	});
});

//SHOW LOGIN-FORM ROUTE
router.get("/login", function(request, response){
	response.render("login");
});

//HANDLING LOGIN LOGIC ROUTE
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(request, response){});


//LOGOUT ROUTE
router.get("/logout", function(request, response){
	request.logout();
	response.redirect("/campgrounds");
});


//MIDDLEWARE
function isLoggedIn(request, response, next){
	if(request.isAuthenticated())
	{
		return next();
	}
	response.redirect("/login");
}

module.exports=router;
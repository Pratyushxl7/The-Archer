var express=require("express");
var router=express.Router();
var CampDB=require("../models/campground");

//===============
// Campground Routes
//===============
//INDEX-Show all campgrounds
router.get("/", function(request, response)
{
	CampDB.find({}, isLoggedIn, function(err, allCampgrounds)
	{
		if(err)
		{
			console.log("Error====>"+err);
		}
		else
		{
			response.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	})
});

//CREATE-Add new campground to DB
router.post("/", isLoggedIn, function(request, response)
{
	//fetch form data, add to array, and redirect to campgrounds page
	var name=request.body.groundname;
	var image=request.body.groundimage;
	var author={id:request.user._id, username:request.user.username};
	var newCampground={name:name, image:image, description:request.body.description, author: author};
	CampDB.create(newCampground, function(err, allCampgrounds)
	{
		if(err)
		{
			console.log("Error====>"+err);
		}
		else
		{
			response.redirect("/campgrounds");
		}
	});
	
});

//NEW-Show form to create new Campground
router.get("/new", function(request, response)
{
	response.render("campgrounds/new.ejs");
});

//Shows more info about one campground
router.get("/:id", function(request, response)
{
	
	//find the campground with provided ID
	CampDB.findById(request.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
		{
			console.log(err);
		} else
		{
			console.log(foundCampground);
			response.render("campgrounds/show", {campground:foundCampground});
		}
	});
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
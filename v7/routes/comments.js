var express=require("express");
var router=express.Router({mergeParams: true}); //mergeParams enable interconnecting request parameters
var CampDB=require("../models/campground");
var comments=require("../models/comment");

//===============
// Comment Routes
//===============
//COMMENT NEW ROUTE
router.get("/new", isLoggedIn, function(request, response){
	//Find campground by id
	CampDB.findById(request.params.id, function(err, foundCampground){
		if(err)
		{
			console.log("Error in adding comment:"+err);
		}
		else
		{
			response.render("comments/newcommentform", {campground:foundCampground});
		}
	})
});


//COMMENT CREATE ROUTE
router.post("/", isLoggedIn, function(request, response){
	//Find campground by id
	CampDB.findById(request.params.id, function(err, foundCampground){
		if(err)
		{
			console.log("Error in finding campground:"+err);
		}
		//Create the new comment and associate it to campground
		else
		{
					//Create the new comment
					Comments.create(request.body.comment, function(err, added_comment){
						if(err)
						{
							console.log("Error in creating comment:"+err);
						}
						else
						{
							//Associate the new comment to the campground
							foundCampground.comments.push(added_comment);
							foundCampground.save();
							response.redirect("/campgrounds/"+foundCampground._id);
						}
		})}})});

//MIDDLEWARE
function isLoggedIn(request, response, next){
	if(request.isAuthenticated())
	{
		return next();
	}
	response.redirect("/login");
}

module.exports=router;
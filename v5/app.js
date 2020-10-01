var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var mongoose=require("mongoose");

//Including CampDB from modules
var CampDB=require("./models/campground.js");
var Comments=require("./models/comment.js");

var seedDB=require("./seeds");



mongoose.connect("mongodb+srv://Pratyush:suzukixl7@cluster0-yxbyk.mongodb.net/CampDBv3?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndexclear:true, useUnifiedTopology: true, useFindAndModify:false}).then(()=>
{console.log("Connected to DB!");}).catch(err => 
{
	console.log("Error:", err.message);
});

seedDB();

app.get("/", function(request, response){
	response.render("landing");
});

//INDEX-Show all campgrounds
app.get("/campgrounds", function(request, response)
{
	CampDB.find({}, function(err, allCampgrounds)
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
app.post("/campgrounds", function(request, response)
{
	//fetch form data, add to array, and redirect to campgrounds page
	var name=request.body.groundname;
	var image=request.body.groundimage;
	var newCampground={name:name, image:image};
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
app.get("/campgrounds/new", function(request, response)
{
	response.render("campgrounds/new.ejs");
});

//Shows more info about one campground
app.get("/campgrounds/:id", function(request, response)
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


//===============
// Comment Routes
//===============

app.get("/campgrounds/:id/comments/new", function(request, response){
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

app.post("/campgrounds/:id/comments", function(request, response){
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

app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

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
			response.render("index", {campgrounds:allCampgrounds});
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
			response.redirect("/index");
		}
	});
	
});

//NEW-Show form to create new Campground
app.get("/campgrounds/new", function(request, response)
{
	response.render("new.ejs");
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
			response.render("show", {campground:foundCampground});
		}
	});
});


app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
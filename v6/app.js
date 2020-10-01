//Declaring stuff
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var CampDB=require("./models/campground.js");
var Comments=require("./models/comment.js");
var User=require("./models/user");
var seedDB=require("./seeds");

//Using stuff
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Passport Configuration
app.use(require("express-session")({secret: " I am different", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(request, response, next){
	response.locals.currentUser=request.user;
	next();
});

//Connection code as a function
function connectToDB(name, password)
{
	mongoose.connect("mongodb+srv://Pratyush:"+password+"@cluster0-yxbyk.mongodb.net/"+name_of_db+"?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndexclear:true, useUnifiedTopology: true, useFindAndModify:false}).then(()=>
{console.log("Connected to DB!");}).catch(err => 
{
	console.log("Error:", err.message);
});
}

//Connection, flexibility, and seeding
var name_of_db="CampDBv6withAuth";
var password="suzukixl7"
connectToDB(name_of_db, password);
seedDB();



//==========
//ROUTES
//==========
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(request, response){
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(request, response){
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




//============Authentication Routes============
//Show-Register Form
app.get("/register", function(request, response){
	response.render("register");
});

//Handle Sign-Up Logic
app.post("/register", function(request, response){
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

//Show-Login Form
app.get("/login", function(request, response){
	response.render("login");
});

//Handling Login logic
app.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(request, response){});


//Logout route that destroys authentication data for the session
app.get("/logout", function(request, response){
	request.logout();
	response.redirect("/campgrounds");
});

function isLoggedIn(request, response, next){
	if(request.isAuthenticated())
	{
		return next();
	}
	response.redirect("/login");
}



app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
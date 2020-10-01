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

//Requiring routes
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

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
var name_of_db="CampDBv7_Refactoring";
var password="suzukixl7"
connectToDB(name_of_db, password);
// seedDB();


app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Pratyush:suzukixl7@cluster0-yxbyk.mongodb.net/CampDB?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndexclear:true, useUnifiedTopology: true, useFindAndModify:false}).then(()=>
{console.log("Connected to DB!");}).catch(err => 
{
	console.log("Error:", err.message);
});

var campgroundSchema=new mongoose.Schema({
	name: String, image: String, desciption: String
});

var CampDB=mongoose.model("Campground", campgroundSchema);

// CampDB.create({name:"Camp 2", image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, function(err, item_returned)
// {
// if(err)
// {
// 	console.log(err);
// } else {
// 	console.log("Newly created campground"+item_returned);
// }});
// var campgrounds=[
// 		{name:"Camp 1", image:}, 
// 		{name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
// 		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}, {name:"Camp 1", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jellystoneofestes.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fsite27-2.jpg&f=1&nofb=1"}, 
// 		{name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
// 		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}, {name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
// 		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}];

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
	CampDB.findById(request.params.id, function(err, foundCampground){
		if(err)
		{
			console.log(err);
		} else
		{
			response.render("show", {campground:foundCampground});
		}
	});
});


app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
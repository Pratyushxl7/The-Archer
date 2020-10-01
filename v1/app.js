var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgrounds=[
		{name:"Camp 1", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jellystoneofestes.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fsite27-2.jpg&f=1&nofb=1"}, 
		{name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}, {name:"Camp 1", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jellystoneofestes.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fsite27-2.jpg&f=1&nofb=1"}, 
		{name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}, {name:"Camp 2", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clearwaterbckoa.com%2Fuploads%2Fpics%2FIMG_1516.JPG&f=1&nofb=1"}, 
		{name:"Camp 3", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandrewmurrayauthor.files.wordpress.com%2F2015%2F08%2Fwupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg&f=1&nofb=1"}];

app.get("/", function(request, response){
	response.render("landing");
});

app.get("/campgrounds", function(request, response)
{
	response.render("campgrounds.ejs", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(request, response)
{
	//fetch form data, add to array, and redirect to campgrounds page
	var name=request.body.groundname;
	var image=request.body.groundimage;
	var newCampground={name:name, image:image};
	campgrounds.push(newCampground);
	response.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(request, response)
{
	response.render("new.ejs");
});

app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!");
});
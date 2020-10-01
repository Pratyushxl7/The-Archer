var mongoose=require("mongoose");

//Creating Campgrounds
var campgroundSchema=new mongoose.Schema({
	name: String, image: String, desciption: String, comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//Returning the model
module.exports=mongoose.model("Campground", campgroundSchema);
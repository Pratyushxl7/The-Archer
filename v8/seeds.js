var mongoose=require("mongoose");
var CampDB=require("./models/campground");
var Comment=require("./models/comment");
var data=[
	{
		name: "Ground 1",
		image: "https://www.clearwaterbckoa.com/uploads/pics/IMG_1516.JPG",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		
	},
	{
		name: "Ground 2",
		image: "https://www.jellystoneofestes.com/wp-content/uploads/2016/12/site27-2.jpg", 		
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		
	},
	{
		name: "Ground 3",
	    image: "https://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg", 							description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		
	}];

function seedDB(){
	CampDB.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("Removed campgrounds!");
        //  //Add a few campgrounds
        // data.forEach(function(seed){
        //     CampDB.create(seed, function(err, eachGround){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("Added a campground---->"+eachGround);
        //             //Create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         eachGround.comments.push(comment);
        //                         eachGround.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    })}; 

module.exports = seedDB;
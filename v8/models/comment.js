var mongoose = require("mongoose");
 
//Creating comment schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
		id: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
		username: String
	}
});
 
module.exports = mongoose.model("Comment", commentSchema);
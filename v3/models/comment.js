var mongoose = require("mongoose");
 
//Creating comment schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
 
module.exports = mongoose.model("Comment", commentSchema);
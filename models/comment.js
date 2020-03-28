var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    comment: String,
    product_id: String,
    username: String
   });

var Comment = mongoose.model("comment", comment)
module.exports = Comment;
var mongoose = require('mongoose');

var item = new mongoose.Schema({
    username: String,
    image: String,
    name: String,
    description: String,
    price: String,
    location: String,
    phone: String
   });

var item_data = mongoose.model("item", item)
module.exports = item_data;
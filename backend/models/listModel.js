const mongoose = require("mongoose")
const ListSchema = new mongoose.Schema({  
    title: String,
    attached:String,
    image:String,
  });
  
module.exports = mongoose.model("List", ListSchema);
const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({
    title: String,
    description: String,
    position: Number,
    image:String,
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "List",  
      },
    ],
  });
  
module.exports = mongoose.model("Card", cardSchema);
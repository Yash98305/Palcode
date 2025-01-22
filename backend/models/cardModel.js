const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    position: Number,
  });
  
module.exports = mongoose.model("Card", cardSchema);
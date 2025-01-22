const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/error.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const Card = require("./models/cardModel.js")
// const mongoose = require("mongoose")
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require("./routes/authRoute.js");
app.use("/api/v1/auth", authRoute);
// const initialCards = [
//   { id: "1", title: "Card 1", description: "This is card 1", position: 1 },
//   { id: "2", title: "Card 2", description: "This is card 2", position: 2 },
//   { id: "3", title: "Card 3", description: "This is card 3", position: 3 },
//   { id: "4", title: "Card 4", description: "This is card 4", position: 4 },
//   { id: "5", title: "Card 5", description: "This is card 5", position: 5 },
//   { id: "6", title: "Card 6", description: "This is card 6", position: 6 },
// ];

// // Insert Initial Data
// const seedDatabase = async () => {
//   try {
//     await Card.deleteMany({});
//     await Card.insertMany(initialCards);
//     console.log("Database seeded with initial cards");
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// };

// seedDatabase();


app.get("/", (req, res) => {
  res.send({
    message: "welcome to Palcode application",
  });
});

app.use(errorMiddleware);

module.exports = app;

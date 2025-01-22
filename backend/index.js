const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/error.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const Card = require("./models/cardModel.js")
// const List = require("./models/listModel.js")
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
// const initialList = [
//      { title: "video title name 1", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 2", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 3", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 4", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 5", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 6", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 7", image : "https://dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg",attached : "product attached 7"},
//      { title: "video title name 1", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 2", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 3", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 4", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 5", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 6", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      { title: "video title name 7", image : "https://www.popsci.com/wp-content/uploads/2023/10/24/How-to-make-spotify-playlists.jpg?quality=85&w=2000",attached : "product attached 7"},
//      ]


// const seedDatabase = async () => {
//   try {
//     await List.deleteMany({});
//     await List.insertMany(initialList);
//     console.log("Database seeded with initial List");
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

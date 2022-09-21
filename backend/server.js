/*
Task name: User endpoints

Requirements
  1.  We need to create CRUD endpoints
  2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
  3.  Each user should have the following data entries: 
        id, name, zip code, latitude, longitude, timezone
  4.  When creating a user, allow input for name and zip code.  
      (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current) 
  5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
  6.  Connect to a ReactJS front-end
  * feel free to add add something creative you'd like

  API Key: 7afa46f2e91768e7eeeb9001ce40de19
*/
const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");

const app = express();

//app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoutes);

app.listen(4000, () => {
	console.log("Server is  running on port 4000".yellow.bold);
});

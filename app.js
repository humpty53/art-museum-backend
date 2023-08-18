const express = require("express"); // importing express
const app = express(); // instance of express

// updated lines of code
app.use(express.json()); // json middleware
const cors = require("cors"); // importing cors
app.use(cors()); // cors middleware
require("dotenv").config(); // importing .env file

//...paste after dotenv config
// importing StreamChat
const StreamChat = require("stream-chat").StreamChat; 
// importing secret key from .env file
const STREAM_CHAT_API_KEY = process.env.STREAM_CHAT_API_KEY; 
// importing secret key from .env file
const STREAM_CHAT_SECRET_KEY = process.env.STREAM_CHAT_SECRET_KEY; 

//...paste after Stream Chat Secret Key
// route to get user token
app.post("/getToken", (req, res) => {
    // if id is not provided
    if (!req.body.id) {
    // send error
      return res.status(400).send({ message: "user id is required" }); 
    }
    // creating instance of StreamChat
    const serverClient = new StreamChat(
      STREAM_CHAT_API_KEY,
      STREAM_CHAT_SECRET_KEY
    );
    // creating token for user
    const token = serverClient.createToken(req.body.id); 
    // sending response
    res.send({ 
      message: "token generated successfully", 
      token: token, 
      username: req.body.id 
    }); 
  });

module.exports = app; // exporting app
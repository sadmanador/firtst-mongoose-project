const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const dataBase = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://mongoose_user:dL5deJlMdsndEQLJ@cluster1.euko3kv.mongodb.net/MyFirstMongooseDB?retryWrites=true&w=majority"
    );
    console.log("database connected");
  } catch (err) {
    console.log(err);
    console.log("db connection failed");
  }
});

dataBase();

app.get("/", (req, res) => {
  res.send("The Web is running");
});

app.listen(port, () => {
  console.log(`listening port: 5000`);
});

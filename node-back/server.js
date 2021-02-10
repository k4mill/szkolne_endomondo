const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const db = require('./config/db.config.js');
const { aktywnosc } = require("./config/db.config.js");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };


app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Dupa jasiu" });
})

require('./route/aktywnosc.route.js')(app);

var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port)
  })
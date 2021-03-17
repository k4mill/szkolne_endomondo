const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/views/';

const app = express();

app.use(express.static(path));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

var corsOptions = {
  origin: "http://localhost:3000"
};

const db = require('./config/db.config.js');

db.sequelize.sync();

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

require('./route/aktywnosc.route.js')(app);
require('./route/users.route.js')(app);
require('./route/klasy.route.js')(app);
require('./route/aktywnosc_typ.route.js')(app);
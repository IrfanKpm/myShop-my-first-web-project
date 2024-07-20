const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
let session = require('express-session')

const connectDB = require("./models/db");
const {PORT,DB_uri} = require("./config/config")

const app = express();


connectDB(DB_uri,"myShop");

app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
//app.use(session({secret:"key_hash12",cookie:{maxAge:6000000000}}));
app.use(session({secret: 'your-secret-key',resave: false,  saveUninitialized: true }));

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));






app.use("/",require("./router/index"));
app.use("/admin",require("./router/admin"));





const fPORT = PORT || 8080;

app.listen(fPORT, () => {
    console.log(`Server running on http://localhost:${fPORT}`);
})


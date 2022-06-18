const express = require("express");
const app = express();
const router =  require('./routes/routes');
const session = require("express-session")
const flash = require("express-flash");
const cookieParser =  require("cookie-parser");
const mongoose = require("mongoose")
require('dotenv').config()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');    
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.use(cookieParser("asdasda"))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:6000 }
}))
app.use(flash());


app.use(router);



const DB_USER= process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

const DB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ebcfn.mongodb.net/inventory?retryWrites=true&w=majority`


const PORT = 4500
mongoose.connect(DB)
.then(
    app.listen(PORT,_=> console.log(`Conectou no banco !!!\n http://localhost:${PORT} `))
)
.catch( (err)=> console.log(err))
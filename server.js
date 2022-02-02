const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectdb = require('../CIBO/database/connection');
const path = require('path');

let app = express();

//Morgan applied
app.use(morgan('tiny'));


//Set body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


//Connecting Databases
connectdb();


//Setting views
app.set('views','./views');
app.set('view engine','ejs');


//Serving statics files
app.use(express.static(path.join(__dirname+"/public")));
app.use('/uploads',express.static(path.join(__dirname+'/uploads')));



// Loading Routes
app.use('/',require('../CIBO/routes/router'));



app.get('/',(req,res)=>{
    res.render('index');
}).listen('3030',()=>{
    console.log('server has been started on http://localhost:3030');
});
'use strict'
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

// cargar arcuivos de rutas
var project_router = require('./routes/project')


//middlewares

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

//cors

//rutas
app.use('/api', project_router);



//exportar 

module.exports = app;
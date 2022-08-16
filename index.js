'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log("Conexxion a la base de datos establecida con exito 11111");
        //creacion del servidor
        app.listen(port, () => {
            console.log("servidor corriendo correctamente en la url "+port);
        })

    })
    .catch(error => console.log(error));

    
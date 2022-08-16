'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String 

});

module.exports = mongoose.model('Project', ProjectSchema);
// projects ---> guarda los document en la coleccion
//se escribe project por que le sistema prulariza el nombre de la coleccion



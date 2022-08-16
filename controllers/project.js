'use strict'

// const res = require("express/lib/response");
var Project = require('../models/proyect');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/proyect');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'soy la home'
        })
    },
    test: function (req, res) {
        return res.status(200).send({
            message: "soy el metodo de accion o test del controlador del project"
        })
    },

    saveProject: function (req, res) {
        var project = new Project()
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;


        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'error al guardar' });

            if (!projectStored) return res.status(404).send({ message: 'no se a podido guar el proyecto' })

            return res.status(200).send({ project: projectStored });
        });

    },

    getProject:function(req, res) {
        var projectid = req.params.id;
        Project.findById(projectid, (err, project) => {

            if (err)
                return res.status(500).send({ message: 'error al devolver los datos' });
            if (!project)

                return res.status(404).send({ message: 'el projeto no existe.' })
            return res.status(200).send({ project })
        }); //buscar un objeto cullo idea sea el que se pasas por aqui
    },

    getProjects: function (req, res) {
        Project.find({}).exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!projects) return res.status(404).send({ message: 'No hay projectos que mostrar' })

            return res.status(200).send({ projects });

        });
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projecUdapte) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!projecUdapte) return res.status(404).send({ message: 'No existe el projecto' })

            return res.status(200).send({
                project: projecUdapte
            });
        });
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectDelete) => {
            if (err) return res.status(500).send({ message: 'no se ha podido elieminar el documento' });
            if (!projectDelete) return res.status(404).send({ message: 'no se puede eliminar ese projecto' })
            return res.status(200).send({
                project: projectDelete
            })
        })
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida..........';
        

        if (req.files) {

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdate) => {
                    if (err) return res.status(200).send({ message: 'imagen no se ha subido' });
                    if (!projectUpdate) return res.status(404).send({ message: 'el projecto no existe' })

                    return res.status(200).send({
                        project: projectUpdate
                    });
                })
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message:'la extencion no es valida'});
                })
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
    getImageFile:function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({message: 'imagen no encontrado'})
            }

        })
    }



};


module.exports = controller;
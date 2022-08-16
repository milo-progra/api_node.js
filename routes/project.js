'use strict'

var express = require('express');
var proyectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'})


router.get('/home',proyectController.home);
router.post('/test',proyectController.test);
router.post('/save-project',proyectController.saveProject);
router.get('/project/:id',proyectController.getProject);
router.get('/projects',proyectController.getProjects);
router.put('/project/:id',proyectController.updateProject);
router.delete('/project/:id',proyectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, proyectController.uploadImage)
router.get('/get-image/:image', proyectController.getImageFile)



module.exports = router

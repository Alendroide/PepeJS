const express = require('express');
const path = require('path')
const Image = require('../models/image');
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});

router.get('/images',(req,res)=>{
    Image.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render('images',{title : 'Imagenes',result});
        })
        .catch((err)=>{
            console.log(err)
        })
});

router.post('/images/upload',upload.single('file'),async(req,res)=>{
    try{
        const newImage = new Image({
            name : req.file.originalname,
            title : req.body.title,
            path : '/uploads/'+req.file.filename
        });
        await newImage.save();
        res.redirect('/images');
    } catch(error){
        console.error(error);
        res.status(500).send('Error al subir el archivo');
    }
});

module.exports = router;
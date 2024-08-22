const express = require('express');
const Message = require('../models/message');
const router = express.Router()

router.get('/chat',(req,res)=>{
    Message.find().sort({ createdAt: -1 }).limit(13)
    .then((result)=>{
        res.render('chat',{title:'Chat',result : (result.reverse())});
    })
    .catch((err)=>{
        console.log(err)
    })
});

router.post('/chat',(req,res)=>{
    const message = new Message(req.body);
    message.save()
        .then((result)=>{
            console.log('Mensaje guardado')
        })
        .catch((err)=>{
            console.log(err);
        });
})

module.exports = router
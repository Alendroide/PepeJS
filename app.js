const express = require('express');
const morgan = require('morgan');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const messageRoutes = require('./routes/messageRoutes');
const imageRoutes = require('./routes/imageRoutes');
const multer = require('multer')
//Crear app
const app = express();

//Conect with MongoDB
const dbURI = 'mongodb://localhost:27017/nodetuts';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then((result)=>{
    console.log('connected to db');
    const server = app.listen(3000,'0.0.0.0',()=>{
        console.log('Server running');

        //SocketIO chat
        const io = socketIo(server);
        io.on('connection',(socket)=>{
            console.log('A user connected');

            socket.on('chat message',(msg)=>{
                io.emit('chat message',msg);
            })

            socket.on('disconnect',()=>{
                console.log('User disconnected')
            });
        });
    });
})
.catch((err)=>{
    console.log(err);
});

//Registrar view engine
app.set('view engine','ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//MiddleWare para obtener solicitud POST correctamente
app.use(express.json());

//routes
app.get('/',(req, res)=>{
    res.render('index',{title:'Home'});
});

app.get('/about',(req, res)=>{
    res.render('about',{title:'About'});
});

app.use(blogRoutes)
app.use(messageRoutes)
app.use(imageRoutes)

//404
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})
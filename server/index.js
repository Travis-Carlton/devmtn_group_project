const express = require('express');
const bP = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const authController = require('./authController'); 

// controllers
const controller = require('./controller.js');


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
}).catch(error => {
    console.log('error with massive', error);
});

app.use(bP.json());

app.use(session({
    secret: process.env.SECRET_SESSION,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 1000*60*60*24*14
    }
}));

app.use(express.static(`${__dirname}/../build`));


///////// Sockets.io  /////////

io.sockets.on('connection', (socket) =>{
    console.log('user connected')



    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

//auth endpoints
app.get('/auth/callback', authController.login);
app.get('/api/user-data', (req, res) => {
    req.session.user ?
    res.status(200).json({ user: req.session.user})
    :
    res.status(200).send('no session')
});
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
});

///////////////////////////////
app.post('/api/devorclient', controller.isDeveloper);
app.post('/api/createdevprofile', controller.createDevProfile); 
app.get('/api/getdevprofile/:id', controller.viewDevProfile);
app.post('/api/createjob', controller.createJob);
app.get('/api/getalljobs', controller.viewAllJobs);
app.get('/api/getselectedjob/:id', controller.viewSelectedJob);
app.post('/api/addfavorite', controller.addFavorite);
app.get('/api/getfavorite/:id', controller.getFavorites);

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

server.listen(4005,()=>{
    console.log('listening on 4005 🦖');
})
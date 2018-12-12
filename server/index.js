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
const stripe = require("stripe")("sk_test_48bsYBhFSRnBOUFnGUpFwpKk");

// controllers
const controller = require('./controller.js');
const emailController = require('./emailController.js');
const msgCntrl = require('./msgController.js');


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
    socket.on('message', (msg) => {
        const db = app.get('db');
        let {message, conversationid, userID} = msg;
        userID = parseInt(userID);
        conversationid = parseInt(conversationid);
        console.log(msg);
        db.create_message([conversationid,message,userID]).then(response=>{
            
        }).catch(err=>console.log(err))


        io.emit('messageFromServer', msg);
        socket.broadcast.emit('notification',msg);
        
    })



    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

//////////////////

/////////Send Grid///
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
app.post('/api/contact/sendgrid', emailController.contactEmail);
app.post(`/api/sendEmailToClient`, emailController.u2uEmail);

//Stripe Donation
app.post("/api/stripe", (req, res) => {
    const stripeToken = req.body.body;
    stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        description: 'Order Id',
        receipt_email: stripeToken.email,
        source: stripeToken.id,
    }, function(err, charge) {
        console.log('charge', charge)
        if(err){
            res.send({
                success: false,
                message: 'Errorr'
            })
        } else {
            res.send({
            success: true,
            message: 'Success'
        })}
    });
});


/////////////////////////

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
app.get('/api/getalldevelopers', controller.getAllDevelopers);
app.post('/api/changestatus', controller.changeStatus);
app.post('/api/accept', controller.accepted);
app.post('/api/applied', controller.applied);
app.get('/api/getjobsposted/:userID', controller.getJobsPosted);
app.get('/api/getapplied/:jobID', controller.getApplied);
app.post('/api/uploadprofilepicture', controller.uploadProfile)
////////////////////////////

//////// messaging calls ///////
app.get('/api/getallusers/formessaging', msgCntrl.getAllUsers);
app.post(`/api/newconversation`, msgCntrl.createConversation);
app.get(`/api/:conversationid/prevcomments`,msgCntrl.getPreviousMessages);
app.get(`/api/getactiveconversations/:userid`, msgCntrl.getActiveConversations);

//////////////////////////

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

server.listen(4005,()=>{
    console.log('listening on 4005 🦖');
})
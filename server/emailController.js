const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    contactEmail : (req,res)=>{
        const {name,email,message} = req.body;
     
        const msg = {
            to: 'devway.us@gmail.com',
            from: 'devway.us@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            // name: `${name}`,
            // text: `${message}`,
            
            html: `<body style='background:blue;'>
                    <strong> name: ${name} </strong> <br/>  
                    <strong> email: ${email} </strong> <br/>
                    <strong> message: ${message}</strong>
                </body>`,
          };
          sgMail.send(msg);
    },

    u2uEmail: (req,res)=>{
        const {modalName,modalEmail,modalMessage,modalFile,modalClientEmail} = req.body;
        // console.log(req.body);
        const msg = {
            to: `${modalClientEmail}`,
            from: 'devway.us@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            // name: `${name}`,
            // text: `${message}`,
            
            html: `<body style='background:blue;'>
                    <strong> name: ${modalName} </strong> <br/>  
                    <strong> email: ${modalEmail} </strong> <br/>
                    <strong> message: ${modalMessage}</strong> <br/>
                    <strong> Attachment: <img src='https://cdn.newsapi.com.au/image/v1/9fdbf585d17c95f7a31ccacdb6466af9'/></strong>
                </body>`,
          };
          sgMail.send(msg);
          res.status(200).send('sent')
        },


}
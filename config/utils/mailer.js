const nodemailer = require('nodemailer')
const config = require('../config')
const mailer = {
    
    sendEmail : function(email){
        var {to, subject, emailText } = email 
        var transporter = nodemailer.createTransport({
          service : config.SMTP_SERVICE || process.env.SMTP_SERVICE,
          auth : {
              user : config.SMTP_MAIL_ID || process.env.SMTP_MAIL_ID,
              pass : config.SMTP_MAIL_PASS || process.env.SMTP_MAIL_PASS
          }
        });

        var mailOptions = {
            from : config.COMPANY_NAME || process.env.COMPANY_NAME + '<h=' + config.SMTP_MAIL_ID ||process.env.SMTP_MAIL_ID+'>',
            to : to, //sending to user email
            subject: subject, // Subject line
            text: emailText, // plaintext body
            html : '<h1>'+emailText+'</h1>'
        }

        transporter.sendMail(mailOptions)
    }
}

module.exports = mailer
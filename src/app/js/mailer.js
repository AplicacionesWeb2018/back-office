var nodemailer = require('nodemailer');

mailer = {};

mailer.mailOptions = {
    from: 'myclotheswebapp@gmail.com',
    to: 'myclotheswebapp@gmail.com',
    subject: 'Table deleted!',
    html: '<h2>Alert</h2><br><h4>PRODUCTS data table has been deleted</h4>'
};


mailer.connect = function(){
    this.transporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'myclotheswebapp@gmail.com',
            pass: 'myclothes:)'
        }
    });
}

mailer.sendMail = function(){
    this.transporter.sendMail(this.mailOptions, 
        (error, info) => {
            if (error)
                console.log(error);
            console.log("ALERT SENT");
        }
    );
}

module.exports = mailer;

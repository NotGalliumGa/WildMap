const express = require('express');
nodemailer = require("nodemailer");
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
});

app.post('/', function(req, res, next){
    var data=req.body;

    const name = req.body.name;
    const location_desc = req.body.location_desc;
    const general_desc = req.body.general_desc;

    var smtpTransport = nodemailer.createTransport({
       host: "smtp.gmail.com", 
       auth: {
       user: "diegoluisdc05@gmail.com",
       pass: "nikk nmkc ucvd usqa"
       }});

       smtpTransport.sendMail({
        from: "diegoluisdc50@gmail.com",
        to: "diegoluisdc05@gmail.com",
        subject: "Emailing with nodemailer",
        text: `New form submission:\n\nName: ${name}\n\nlocation_desc: ${location_desc}\n\ngeneral_desc: ${general_desc}`
    }, function(error, info) {  // Renamed parameter to avoid conflict
        if (error) {
            console.error("Error:", error);
            res.status(500).send("Failed to send email.");
        } else {
            console.log("Message sent:", info.messageId);
            res.send("Email sent successfully!");
        }
        smtpTransport.close();
    });

});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
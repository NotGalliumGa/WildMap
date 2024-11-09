const express = require('express');
nodemailer = require("nodemailer");

const app = express();

app.use(express.urlencoded());

app.get('/', function(request, response, next){

	response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
			<div class="card">
				<div class="card-header">Sample Form</div>
				<div class="card-body">
					<form method="POST" action="/">
						<div class="mb-3">
							<label>First Name</label>
							<input type="text" name="first_name" id="first_name" class="form-control" />
						</div>
						<div class="mb-3">
							<label>Last Name</label>
							<input type="text" name="last_name" id="last_name" class="form-control" />
						</div>
						<div class="mb-3">
		                	<label>Email Address</label>
		                	<input type="text" name="email_address" id="email_address" class="form-control" />
		                </div>
		                <div class="mb-3">
		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
		                </div>
					</form>
				</div>
			</div>
		</div>
	`);


});

app.post('/', function(request, response, next){
    var data=request.body;

    var smtpTransport = nodemailer.createTransport({
       host: "smtp.gmail.com", 
       auth: {
       user: "diegoluisdc05@gmail.com",
       pass: "nikk nmkc ucvd usqa"
       }});

   smtpTransport.sendMail({  //email options
   from: "diegoluisdc50@gmail.com",
   to: "galven.rivera@gmail.com", // receiver
   subject: "Emailing with nodemailer", // subject
   html: "here your data goes" // body (var data which we've declared)
    }, function(error, response){  //callback
         if(error){
           console.log(error);
        }else{
           console.log("Message sent: " + response.message);
       }

   smtpTransport.close(); 
    }); 

});

app.listen(2000);
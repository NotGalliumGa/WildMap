const express = require('express');
nodemailer = require("nodemailer");
puppet = require('puppeteer');


const app = express();

app.use(express.urlencoded());

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


async function scrapeWebsite() {
  // Launch Puppeteer in headless mode
  const browser = await puppet.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set headers to mimic a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://usnh.evenue.net/events/UNHSAE',
      'Connection': 'keep-alive'
    });
    await page.setCookie({
        name: 'BIGipServerapigateway',
        value: '2164359946.16415.0000',
        domain: 'usnh.evenue.net',
        path: '/',
      });
    

    // Navigate to the URL
    await page.goto('https://usnh.evenue.net/events/UNHSAE', {
      waitUntil: 'networkidle2', // Wait until the page is fully loaded
    });

    // Extract the page content (assuming it's a text file)
    const data = await page.evaluate(() => document.body.innerText);

    //console.log('Scraped Data:', data);

    // Close the browser
    await browser.close();

    return data;
  } catch (error) {
    console.error('Error scraping website:', error);
    await browser.close();
    throw error;
  }
}


// Run the scraper
scrapeWebsite()
  .then(data => {
    // gets only events
    const matches = data.match(/UNH Student Activities 24-25(?:.*\s){4}/g);
    console.log(matches)
  })
  .catch(error => console.error('Scraping failed:', error));

app.listen(2000);
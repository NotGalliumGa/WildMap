const express = require('express');
const nodemailer = require("nodemailer");
const puppet = require('puppeteer');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../FrontEnd')));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
});

app.post('/', function(req, res, next){
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

app.get('/scrape', async (req, res) => {
try {
    const data = await scrapeWebsite();
    console.log(data)
    let matches = data.match(/UNH Student Activities 24-25(?:.*\s){4}/g); // Adjust the regex or filter logic if necessary
    if (matches == null) {
        console.log("backup data was forced to be used")
        matches = backupData.match(/UNH Student Activities 24-25(?:.*\s){4}/g);
    }

    res.json(matches);  // Send the extracted data as JSON
} catch (error) {
    console.error('Error in /scrape endpoint:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
}
});

app.listen(2000, () => {
    console.log("http://localhost:2000/")
})

const backupData = `UNH Student Activities 24-25
UNH Makers Expo
Fri, Dec 6, 2024 ⦁ 10:00am
UNH - Granite State Room
UNH Student Activities 24-25
Mr. UNH hosted by Chi Omega
Sun, Nov 10, 2024 ⦁ 4:00pm
UNH - Granite State Room
UNH Student Activities 24-25
Crochet 101 Workshop
Fri, Nov 15, 2024 ⦁ 6:00pm
MUB 330/332
UNH Student Activities 24-25
Asian Night Market
Fri, Nov 15, 2024 ⦁ 6:00pm
UNH - Granite State Room
UNH Student Activities 24-25
Wildcat Dance Crew Fall Showcase
Sat, Nov 23, 2024 ⦁ 2:00pm
UNH - Johnson Theatre
UNH Student Activities 24-25
Cultural Exploration Night with NACA
Thu, Nov 14, 2024 ⦁ 7:00pm
UNH - Strafford Room
UNH Student Activities 24-25
BSU Roll Bounce
Sat, Nov 16, 2024 ⦁ 6:00pm
UNH - Granite State Room
UNH Student Activities 24-25
CHAARG Turkey Trot
Sun, Nov 24, 2024 ⦁ 12:00pm
Wildcat Statue
UNH Student Activities 24-25
UNH WildTones Winter Concert
Fri, Dec 6, 2024 ⦁ 7:00pm
MUB E-Center Underground Room
UNH Student Activities 24-25
Wildcards Fall Syndicon
Sat, Nov 16, 2024 ⦁ 11:30am
UNH - Strafford Room`;
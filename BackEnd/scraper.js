import { launch } from 'puppeteer';

async function scrapeWebsite() {
  // Launch Puppeteer in headless mode
  const browser = await launch({ headless: true });
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
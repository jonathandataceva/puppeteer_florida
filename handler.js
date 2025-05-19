// handler.js
const puppeteer = require('puppeteer');
async function main() { /* … */ }
module.exports = { main };

export async function main() {
  const DOWNLOAD_URL = 'https://data-download.mqa.flhealthsource.gov/LicensureData?fileName=LIC_701-P.txt&handler=DownloadDataFile';

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  await page.goto(DOWNLOAD_URL, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#email', { visible: true });
  await page.type('#email', 'surnahakimian@gmail.com', { delay: 50 });
  await page.type('#password', 'Dishant10!', { delay: 50 });
  await Promise.all([
    page.click('#next'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
  ]);

  const { cookies } = await client.send('Network.getAllCookies');
  await browser.close();

  return cookies
    .filter(c => c.domain.includes('data-download.mqa.flhealthsource.gov'))
    .map(c => `${c.name}=${c.value}`)
    .join('; ');
}

// index.js
import express from 'express';
import puppeteer from 'puppeteer';
import { main } from './handler.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  try {
    const cookieHeader = await main();
    res.type('text/plain').send(cookieHeader);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error fetching cookies');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

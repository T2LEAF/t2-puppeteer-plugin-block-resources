import puppeteerExtra from 'puppeteer-extra';
import blockResources from '../src';

// | "document"
// | "stylesheet"
// | "image"
// | "media"
// | "font"
// | "script"
// | "texttrack"
// | "xhr"
// | "fetch"
// | "eventsource"
// | "websocket"
// | "manifest"
// | "other"

const bl=blockResources()
bl.add(['image','media','stylesheet'])
puppeteerExtra.use(bl);

(async () => {
  const browser = await puppeteerExtra.launch({
    headless:false,
    userDataDir:'./profile'
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080
});

  await page.goto('https://unsplash.com/')

//   await browser.close();
})();
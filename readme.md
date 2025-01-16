# t2-puppeteer-plugin-block-resources

[![npm version](https://badge.fury.io/js/t2-puppeteer-plugin-block-resources.svg)](https://badge.fury.io/js/t2-puppeteer-plugin-block-resources)

## Description


## Installation

```bash
    npm install t2-puppeteer-plugin-block-resources
```

or using Yarn:

```bash
    yarn add t2-puppeteer-plugin-block-resources
```




### Usage with puppeteer-extra

```js

import puppeteerExtra from 'puppeteer-extra';
import blockResources from 't2-puppeteer-plugin-block-resources';

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
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080
});

  await page.goto('https://unsplash.com/')

//   await browser.close();
})();

```



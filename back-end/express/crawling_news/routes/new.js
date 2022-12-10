const express = require("express");
const router = express.Router();

const { parse } = require("node-html-parser");
const { Builder, Browser, By, until } = require("selenium-webdriver");
const chromeDriver = require("selenium-webdriver/chrome");
const chromeOptions = new chromeDriver.Options();

chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");

const crawling = async () => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();

  await driver.manage().window().maximize();

  let news = [];

  let urls = [];
  let headLines = [];
  let summaries = [];
  let presses = [];
  let dates = [];
  try {
    await driver.get(
      "https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258"
    );

    await driver.wait(
      until.elementLocated(By.className("newsList top")),
      5 * 1000
    );
    const list = await driver
      .findElement(By.xpath("//li[@class='newsList top']/dl"))
      .getAttribute("innerHTML");

    const html = await parse(list);
    const author = html.querySelectorAll("span");

    const thumb = await driver.findElements(
      By.xpath("//li[@class='newsList top']/dl/dt/a/img")
    );
    const sub = await driver.findElements(
      By.xpath("//li[@class='newsList top']/dl/dd[@class='articleSubject']")
    );
    const sum = await driver.findElements(
      By.xpath("//li[@class='newsList top']/dl/dd[@class='articleSummary']")
    );
    const pre = await driver.findElements(
      By.xpath(
        "//li[@class='newsList top']/dl/dd[@class='articleSummary']/span[@class='press']"
      )
    );
    for (let i = 0; i < 10; i++) {
      const url = await thumb[i].getAttribute("src");
      const summary = await sum[i].getText();
      const headLine = await sub[i].getText();
      const press = await pre[i].getText();
      urls.push(url);
      summaries.push(summary.slice(0, 83));
      headLines.push(headLine);
      console.log(press);
    }

    for (let i = 0; i < 30; i += 3) {
      presses.push(author[i].childNodes[0].rawText);
      dates.push(author[i + 2].childNodes[0].rawText);
    }
    for (let i = 0; i < 10; i++)
      news.push({
        urls: urls[i],
        headLines: headLines[i],
        summaries: summaries[i],
        presses: presses[i],
        dates: dates[i],
      });
    console.log(news);
  } catch (err) {
    console.log(err);
  }
  await driver.quit();
};

router.get("/", async (req, res, next) => {
  res.send({ data: "" });
  crawling();
});

module.exports = router;

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

  let url = [];
  let headLine = [];
  let summary = [];
  let press = [];
  let date = [];
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

    const thumb = await driver.findElements(
      By.xpath("//li[@class='newsList top']/dl/dt/a/img")
    );
    for (let i = 0; i < 10; i++) {
      const tmp = await thumb[i].getAttribute("src");
      url.push(tmp);
    }

    const subject = html.querySelectorAll("dd");

    const author = html.querySelectorAll("span");
    for (let i = 0; i < 20; i += 2) {
      headLine.push(subject[i].childNodes[1].childNodes[0].rawText);
      summary.push(
        subject[i + 1].childNodes[0].rawText
          .replace(/\t/g, "")
          .replace(/\n/g, "")
      );
    }
    for (let i = 0; i < 30; i += 3) {
      press.push(author[i].childNodes[0].rawText);
      date.push(author[i + 2].childNodes[0].rawText);
    }
    for (let i = 0; i < 10; i++)
      news.push({
        url: url[i],
        headLine: press[i],
        summary: summary[i],
        press: press[i],
        date: date[i],
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

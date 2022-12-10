const express = require("express");
const router = express.Router();

const { Builder, Browser, By, until } = require("selenium-webdriver");
const chromeDriver = require("selenium-webdriver/chrome");
const chromeOptions = new chromeDriver.Options();

chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");

const crawling = async (page) => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();

  await driver.manage().window().maximize();

  let news = [];
  let hyperLinks = [];
  let imgUrls = [];
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
    await driver.wait(
      until.elementIsEnabled(
        driver.findElement(By.xpath("//tbody/tr/td/table/tbody/tr"))
      ),
      5 * 1000
    );
    await driver
      .findElement(
        By.xpath(
          `//table[@class='Nnavi']/tbody/tr/td/table/tbody/tr/td/a[contains(text(), '${page}')]`
        )
      )
      .click();

    await driver.wait(
      until.elementLocated(By.className("newsList top")),
      5 * 1000
    );

    const [
      getHyperLink,
      getImageUrl,
      getHeadLine,
      getSummary,
      getPress,
      getDate,
    ] = await Promise.all([
      driver.findElements(By.xpath("//li[@class='newsList top']/dl/dt/a")),
      driver.findElements(By.xpath("//li[@class='newsList top']/dl/dt/a/img")),
      driver.findElements(
        By.xpath("//li[@class='newsList top']/dl/dd[@class='articleSubject']")
      ),
      driver.findElements(
        By.xpath("//li[@class='newsList top']/dl/dd[@class='articleSummary']")
      ),
      driver.findElements(
        By.xpath(
          "//li[@class='newsList top']/dl/dd[@class='articleSummary']/span[@class='press']"
        )
      ),
      driver.findElements(
        By.xpath(
          "//li[@class='newsList top']/dl/dd[@class='articleSummary']/span[@class='wdate']"
        )
      ),
    ]);

    for (let i = 0; i < 8; i++) {
      const hyperLink = await getHyperLink[i].getAttribute("href");
      const imgUrl = await getImageUrl[i].getAttribute("src");
      const headLine = await getHeadLine[i].getText();
      const summary = await getSummary[i].getText();
      const press = await getPress[i].getText();
      const date = await getDate[i].getText();

      hyperLinks.push(hyperLink);
      imgUrls.push(imgUrl);
      headLines.push(headLine);
      summaries.push(summary.slice(0, 83));
      presses.push(press);
      dates.push(date);

      news.push({
        hyperLink: hyperLinks[i],
        imgUrl: imgUrls[i],
        headLine: headLines[i],
        summary: summaries[i],
        press: presses[i],
        date: dates[i],
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
  return news;
};

router.get("/:page", async (req, res, next) => {
  const data = await crawling(req.params.page);
  res.status(200).json(data);
});

module.exports = router;

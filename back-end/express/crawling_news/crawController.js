const crawModel = require("./crawModel");

const { Builder, Browser, By, until } = require("selenium-webdriver");
const chromeDriver = require("selenium-webdriver/chrome");
const chromeOptions = new chromeDriver.Options();

chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--no-sandbox");

exports.crawData = async () => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();

  await driver.manage().window().maximize();

  try {
    await driver.get(
      "https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258&date=20221211"
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
    for (let i = 1; i <= 7; i++) {
      await driver
        .findElement(
          By.xpath(
            `//table[@class='Nnavi']/tbody/tr/td/table/tbody/tr/td/a[contains(text(), ${i})]`
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
        driver.findElements(
          By.xpath("//li[@class='newsList top']/dl/dt/a/img")
        ),
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

      for (let j = 0; j < 8; j++) {
        // console.log(getImageUrl[j]);
        if (
          getHyperLink[j] === undefined ||
          getImageUrl[j] === undefined ||
          getHeadLine[i] === undefined
        ) {
          continue;
        }
        const hyperLink = await getHyperLink[j].getAttribute("href");
        let imgUrl = await getImageUrl[j].getAttribute("src");
        let headLine = await getHeadLine[j].getText();
        const summary = await getSummary[j].getText();
        const press = await getPress[j].getText();
        const date = await getDate[j].getText();
        let news = [hyperLink, imgUrl, headLine, summary, press, date];

        crawModel.insertData(news);
        await driver.manage().setTimeouts({ implicit: 500 });
      }
      await driver.manage().setTimeouts({ implicit: 1000 });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
};

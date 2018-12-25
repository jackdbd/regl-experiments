const puppeteer = require("puppeteer");
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

describe("App (visual regression)", () => {
  // use the same browser instance for all tests to save time
  let browser = null;
  beforeAll(async () => {
    // WebGL context is available in headless mode too!
    browser = await puppeteer.launch({ headless: true });
  });
  afterAll(async () => {
    browser.close();
  });
  it("should match the snapshot", async () => {
    const page = await browser.newPage();
    const url = "http://localhost:3000/";
    const directNavigationOptions = {
      waitUntil: "networkidle2",
    };
    await page.goto(url, directNavigationOptions);
    const image = await page.screenshot({ path: "page.png" });
    expect(image).toMatchImageSnapshot();
  });
});

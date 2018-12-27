const puppeteer = require("puppeteer");
const HOST = "http://localhost:3000";
const EXPECTED_IMAGES = "src/__tests__/expected_images";

describe("Visual regressions)", () => {
  // use the same browser instance for all visual regression tests to save time
  let browser = null;
  beforeAll(async () => {
    // WebGL context is available in headless mode too!
    browser = await puppeteer.launch({ headless: true });
  });
  afterAll(async () => {
    browser.close();
  });
  it("matches the expected snapshot of /", async () => {
    const page = await browser.newPage();
    const url = `${HOST}/`;
    const directNavigationOptions = {
      waitUntil: "networkidle2",
    };
    await page.goto(url, directNavigationOptions);
    const options = {
      path: `${EXPECTED_IMAGES}/home.png`,
    };
    const image = await page.screenshot(options);
    expect(image).toMatchImageSnapshot();
  });
  it("matches the expected snapshot of /01", async () => {
    const page = await browser.newPage();
    const url = `${HOST}/01`;
    const directNavigationOptions = {
      waitUntil: "networkidle2",
    };
    await page.goto(url, directNavigationOptions);
    const options = {
      path: `${EXPECTED_IMAGES}/one-shot-rendering.png`,
    };
    const image = await page.screenshot(options);
    expect(image).toMatchImageSnapshot();
  });
  it("matches the expected snapshot of /no-match", async () => {
    const page = await browser.newPage();
    const url = `${HOST}/no-match`;
    const directNavigationOptions = {
      waitUntil: "networkidle2",
    };
    await page.goto(url, directNavigationOptions);
    const options = {
      path: `${EXPECTED_IMAGES}/no-match.png`,
    };
    const image = await page.screenshot(options);
    expect(image).toMatchImageSnapshot();
  });
});

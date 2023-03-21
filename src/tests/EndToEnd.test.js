import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event__Details");

    expect(eventDetails).toBeNull();
  });
});

describe("Filter events by city", () => {
  let browser;
  let page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("when user hasn’t searched for a city, show upcoming events from all cities.", async () => {
    const EventList = await page.$(".EventList");
    expect(EventList).toBeDefined();
    const CitySearchInput = await page.$(".city");
    expect(CitySearchInput).toBeDefined();
    const CitySearchInputValue = await page.evaluate(
      (CitySearchInput) => CitySearchInput.value,
      CitySearchInput
    );
    expect(CitySearchInputValue).toBe("");
  });

  test("user should receive a list of cities (suggestions) that match what they’ve typed", async () => {
    const CitySearch = await page.$(".suggestions li");
    expect(CitySearch).toBeDefined();
  });

  test("user should receive a list of upcoming events in the selected city", async () => {
    await page.reload();
    await page.type(".city", "Nairobi", { delay: 100 });
    await page.click(".suggestions li");
    const events = await page.$$eval(".event", (element) => element.length);
    expect(events).toBe(2);
  });
});

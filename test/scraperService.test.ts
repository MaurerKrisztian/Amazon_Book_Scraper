import { ScraperService } from "../services/ScraperService/ScraperService";

import fileUrl from "file-url";

import puppeteer from "puppeteer";
import { ScraperServiceOptions } from "../services/ScraperService/ScraperServiceOptions";

const scraperService = new ScraperService(new ScraperServiceOptions(), false);


test("cleanValue test", () => {
    const expected = scraperService.cleanValue("clean\n\n this\n up\n");
    expect(expected).toBe("clean this up");
});


test("getSelectorText test", async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fileUrl("test/test.html"));
    const expected = await scraperService.getSelectorText(page, ".second");
    await browser.close();

    expect(expected).toBe("Second title");
});

test("getSelectorHTML test", async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fileUrl("test/test.html"));
    const expected = await scraperService.getSelectorHTML(page, "#testId");
    await browser.close();

    expect(expected).toBe('<h1 class="title second">Second title</h1>');
});

test("navigateToBookDetails test", async () => {
    jest.setTimeout(8000);
    const browser = await puppeteer.launch({
        headless: true,
        args: [`--window-size=${2000},${1400}`]
    });
    const page = await browser.newPage();
    await page.setViewport({width: 2000, height: 1400});
    const expected = await scraperService.navigateToBookDetails(page, "B07LBZQX5G", ScraperServiceOptions.prototype.amazonUrl);

    await browser.close();
    expect(expected).toBe(true);
});

test("getImgSrc test", async () => {
    jest.setTimeout(8000);
    const browser = await puppeteer.launch({
        headless: true,
        args: [`--window-size=${2000},${1400}`]
    });
    const page = await browser.newPage();
    await page.setViewport({width: 2000, height: 1400});
    await scraperService.navigateToBookDetails(page, "B07LBZQX5G", ScraperServiceOptions.prototype.amazonUrl);
    await page.waitForSelector("#ebooks-img-canvas img[src]");
    const expected = await scraperService.getImgSrc(page, "#ebooks-img-canvas img[src]");


    await browser.close();

    expect(expected).toBe("https://m.media-amazon.com/images/G/01/digital/sitb/sticker/sitb-sticker-v3-xsmall.png");
});
test("getIframeContent test", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fileUrl("test/test2.html"));

    const expected = await scraperService.getIframeContent(page, "#iframe", "#id");


    await browser.close();

    expect(expected).toBe("Jo reggelt Vietnam!");
});

test("getIframeContentTryDifferentSelectors test", async () => {
    jest.setTimeout(8000);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fileUrl("test/test2.html"));
    const selectors = ["#asd", ".sad", "#id"];
    const expected = await scraperService.getIframeContentTryDifferentSelectors(page, "#iframe", selectors);


    await browser.close();

    expect(expected).toBe("Jo reggelt Vietnam!");
});

test("tryDifferentSelectors test", async () => {
    jest.setTimeout(8000);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fileUrl("test/test.html"));
    const selectors = ["#asd", "#dsd", ".second"];
    const expected = await scraperService.tryDifferentSelectors(page, selectors);
    await browser.close();

    expect(expected).toBe("Second title");
});

test("getAllTabs test", async () => {
    jest.setTimeout(9000);
    const browser = await puppeteer.launch({
        headless: true,
        args: [`--window-size=${2000},${1400}`]
    });
    const page = await browser.newPage();
    await page.setViewport({width: 2000, height: 1400});
    await scraperService.navigateToBookDetails(page, "B001AZT98I", ScraperServiceOptions.prototype.amazonUrl);
    const tabs = await scraperService.getAllTabs(page);
    const expected = tabs.length;
    await browser.close();

    expect(expected).toBe(6);
});

test("setupBrowser test", async  () => {
    const size = {
        height: 1400,
        width: 2000
    };
    const page = await scraperService.setupBrowser(false, size);
    let expected = false;
    if (page !== undefined) {
        expected = true;
    }
    await scraperService.browser.close();
    expect(expected).toBe(true);
});

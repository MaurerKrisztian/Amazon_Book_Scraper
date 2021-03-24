export class ScraperHelper {

    async getSelectorText(page: any, selector: string) {
        await page.waitForSelector(selector, {
            timeout: 2000
        }).catch((err: any) => {
            /* foo */
        });
        const element = await page.$(selector).catch((err: any) => {
            /* foo */
        });
        const text = await page.evaluate((element2: any) => element2.textContent, element).catch((err: any) => {
            /* foo */
        });
        if (text === undefined) {
            return;
        }
        return this.cleanValue(text.toString());
    }

    async getSelectorHTML(page: any, selector: string) {
        await page.waitForSelector(selector, {
            timeout: 2000
        }).catch((err: any) => {
            return;
        });

        const element = await page.$(selector).catch((err: any) => {
            /* foo */
        });
        return await page.evaluate((element2: any) => element2.innerHTML, element).catch((err: any) => {
            /* foo */
        }).catch(() => {
            /* foo */
        });
    }


    async getIframeContent(page: any, iframeSelector: string, selector: string, text: boolean = false) {
        const elementHandle = await page.$(iframeSelector).catch((err: any) => { /* foo */});
        if (!elementHandle) {
            return;
        }
        const frame = await elementHandle.contentFrame().catch((err: any) => { /* foo */});


        let result;
        if (text) {
            result = await this.getSelectorText(frame, selector).catch((err: any) => { /* foo */});
        } else {
            result = await this.getSelectorHTML(frame, selector).catch((err: any) => { /* foo */});
        }

        return result;
    }

    async getIframeContentTryDifferentSelectors(page: any, iframeSelector: string, selectors: string[], text: boolean = false) {
        let value;
        for (const selector of selectors) {
            if (text) {
                value = await this.getIframeContent(page, iframeSelector, selector, true);
            } else {
                value = await this.getIframeContent(page, iframeSelector, selector);
            }
            if (value && value !== []) return value;
        }
    }

    cleanValue(value: string) {
        return value
            .replace(/\n/g, "")
            .replace(/:/g, "");
    }
    async navigateToBookDetails(page: any, asin: string, url: string) {
        const searchBox = "#twotabsearchtextbox";
        await page.goto(url);
        await page.waitForSelector(searchBox);
        await page.focus(searchBox);

        // or input[name=field-keywords]
        await page.$eval(searchBox, (el: any, value: any) => el.value = value, asin);
        await page.click(".nav-search-submit-text");
        await page.waitForNavigation();

        return await new Promise(async (resolve, reject) => {
            await page.click('div[data-asin="' + asin + '"] img').then(() => {
                resolve(true);
            }).catch((err: any) => {
                resolve(false);
            });
        }).catch();
    }

    async tryDifferentSelectors(page: any, selectors: string[], img: boolean = false) {
        let value;
        for (const selector of selectors) {
            if (img) {
                value = await this.getImgSrc(page, selector);
            } else {
                value = await this.getSelectorText(page, selector);
            }
            if (value && value !== []) return value;
        }
    }

    async getImgSrc(page: any, selector: string) {
        const src = await page.$$eval(selector, (imgs: any) => imgs.map((img: any) => img.getAttribute("src")));
        return src[0];
    }

}

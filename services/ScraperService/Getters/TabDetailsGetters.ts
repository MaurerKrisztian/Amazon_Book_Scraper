import { ScraperHelper } from "../ScraperHelper";

export class TabDetailsGetters extends ScraperHelper {

    titleSelector = 'span[id="productTitle"]';
    priceSelectors: string[] = ["#newBuyBoxPrice", ".kindle-price td:nth-child(2) span", "#price", 'div[data-a-accordion-row-name="accordion_section_cash"] div div div div:nth-child(2) span'];
    imgSelectors = ["#img-canvas img[src]", "#ebooks-img-canvas img[src]", "#audibleimageblock_feature_div img[src]"];
    descriptionSelectors = ["#iframeContent"];

    constructor() {
        super();
    }

    public async getAudioBook(asin: string, page: any) {
        let product: {};
        product = {
            author: await this.getSelectorText(page, "table #detailspublisher td a"),
            listeningLength: await this.getSelectorText(page, "#detailsListeningLength td span"),
            narrator: await this.getSelectorText(page, "#detailsnarrator td a"),
            releaseDate: await this.getSelectorText(page, "#detailsReleaseDate td span"),
            publisher: await this.getSelectorText(page, "#detailspublisher td a"),
            programType: await this.getSelectorText(page, "#detailsProgramType td span"),
            language: await this.getSelectorText(page, "#detailsLanguage td span"),
            asin: await this.getSelectorText(page, "#detailsAsin td span"),
            version: await this.getSelectorText(page, "#detailsVersion td span"),
        };

        if (!product) return;
        const additionalData = await this.getAdditionalData(page);
        return {
            ...additionalData,
            ...product,
        };
    }
    async getAdditionalData(page: any) {
        return {
            title: await this.getSelectorText(page, this.titleSelector),
            price: await this.tryDifferentSelectors(page, this.priceSelectors),
            description: await this.getIframeContentTryDifferentSelectors(page, "#bookDesc_iframe", this.descriptionSelectors),
            img: await this.tryDifferentSelectors(page, this.imgSelectors, true),
        };
    }

    public async getNormalBook(asin: string, page: any) {
        let product = {};
        const getListValue = async (row: number) => {
            const keyCell = 1;
            const valueCell = 2;

            const key = await this.getSelectorText(page, "#detailBullets_feature_div ul:first-child li:nth-child(" + row + ") span span:nth-child(" + keyCell + ")");
            const value = await this.getSelectorText(page, "#detailBullets_feature_div ul:first-child li:nth-child(" + row + ") span span:nth-child(" + valueCell + ")");

            if (key === undefined || value === undefined) return;

            return {[key]: value};
        };


        const iterateList = async () => {
            let result = {};
            let value: any = "";
            let row = 1;
            while (value !== undefined) {
                value = await getListValue(row).catch(() => {
                    return;
                });
                if (value !== undefined) result = {...result, ...value};
                row++;
            }
            return result;
        };

        const listData = await iterateList();
        const title = await this.getSelectorText(page, this.titleSelector);
        if (!listData || !title) return;

        await page.click("#bdSeeAllPrompt").catch((err: any) => {
            /* foo */
        });


        const additionalData = await this.getAdditionalData(page);
        product = {
            ...additionalData,
            ...listData
        };

        return product;
    }
}

import { ScraperHelper } from "./ScraperHelper";
import { IScraperServiceOptions } from "./ScraperServiceOptions";

import puppeteer from "puppeteer";

export interface ISize {
    width: number;
    height: number;
}

export class ScraperService extends ScraperHelper {
    browser: any;
    visible: boolean = false;

    constructor(private readonly options: IScraperServiceOptions,  visible?: boolean) {
        super();
        this.visible = visible || false;
    }

    async setupBrowser(visible: boolean, size: ISize): Promise<any> {
        this.browser = await puppeteer.launch({
            headless: !visible,
            args: [`--window-size=${size.width},${size.height}`]
        });
        const page = await this.browser.newPage();
        await page.setViewport({width: size.width, height: size.height});
        return page;
    }

    public async findAsin(asin: string): Promise<any> {
        const page = await this.setupBrowser(this.visible, {width: 2000, height: 1400});
        const navigate = await this.navigateToBookDetails(page, asin, this.options.amazonUrl);
        if (!navigate) {
            return;
        }

        const allTabs = await this.getAllTabs(page);

        const result = [];
        let tabResult;

        // get tabs book details value
        for (const tabObj of allTabs) {
            console.log("[TAB] ", tabObj);

            if (this.options.disabledTabNames.includes(tabObj.tab)) continue;

            await page.click(tabObj.selector).catch((err: any) => {
                console.log("click error");
            });

            // select the good getter function
            let tabGetterFunction = this.options.tabGetters.get(tabObj.tab);
            if (tabGetterFunction !== undefined) {
                tabResult = await tabGetterFunction(asin, page);
            } else {
                tabGetterFunction = this.options.tabGetters.get("default");
                if (tabGetterFunction !== undefined) {
                    tabResult = await tabGetterFunction(asin, page);
                } else {
                    return;
                }

                if (tabResult === undefined) {
                    return;
                }
            }

            result.push({tab: tabObj.tab, ...tabResult});
        }
        await this.browser.close();
        return result;
    }

    async getAllTabs(page: any): Promise<any> {
        let tabs: any = [];
        for (const selectFn of this.options.tabNameGetters) {
            tabs = await selectFn(page);
            if (tabs !== undefined && tabs.length > 0) return tabs;
        }
        return tabs;
    }

}

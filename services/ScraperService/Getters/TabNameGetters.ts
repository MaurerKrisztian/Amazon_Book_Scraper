import { ScraperHelper } from "../ScraperHelper";

export class TabNameGetters extends ScraperHelper {
    constructor() {
        super();
    }

    async getTabs1(page: any) {
        const tabs = [];
        let tab: any = "";
        let i = 0;
        while (tab !== undefined) {
            tab = await this.getSelectorText(page, "#mediaTab_heading_" + i + " a span div span").catch(() => {
                /* foo */
            });
            if (tab !== undefined) tabs.push({
                tab,
                selector: "#mediaTab_heading_" + i + " a span div span"
            });
            i++;
        }
        return tabs;
    }

    async getTabs2(page: any) {
        const tabs = [];
        let tab: any;
        for (let j = 1; j < 7; j++) {
            tab = await this.getSelectorText(page, "#tmmSwatches ul li:nth-child(" + j + ") span span span span ").catch(() => {
                /* foo */
            });
            if (tab !== undefined) tabs.push({
                tab,
                selector: "#tmmSwatches ul li:nth-child(" + j + ") span span span span "
            });
        }
        return tabs;
    }
}

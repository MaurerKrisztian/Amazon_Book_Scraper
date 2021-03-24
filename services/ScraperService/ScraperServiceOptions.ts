import { TabDetailsGetters } from "./Getters/TabDetailsGetters";
import { TabNameGetters } from "./Getters/TabNameGetters";

export interface IScraperServiceOptions {
    tabGetters: Map<string, (asin: any, page: any) => any>;
    tabNameGetters: any[];
    disabledTabNames: string[];
    amazonUrl: string;
}

export class ScraperServiceOptions implements IScraperServiceOptions {

    static tabGetter = new TabDetailsGetters();
    static tabNameGetter = new TabNameGetters();

    amazonUrl: string = "https://www.amazon.com/books-used-books-textbooks/";
    disabledTabNames: string[] = ["Other Sellers"];

    tabGetters = new Map([
        ["default", function (asin: any, page: any) {
            return ScraperServiceOptions.tabGetter.getNormalBook(asin, page);
        }],
        ["Audiobook", function (asin: any, page: any) {
            return ScraperServiceOptions.tabGetter.getAudioBook(asin, page);
        }]
    ]);

    tabNameGetters = [
        (page: any) => {
            return ScraperServiceOptions.tabNameGetter.getTabs1(page);
        },
        (page: any) => {
            return ScraperServiceOptions.tabNameGetter.getTabs2(page);
        }
    ];

}

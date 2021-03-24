import {ProductRepository} from "../../db_models/ProductRepository";
import {ScraperService} from "../ScraperService/ScraperService";

export class CacheService {
    asinFields: string[] = ["asin", "ASIN", "ISBN-10"];

    constructor(private readonly productRepo: ProductRepository, private readonly scraperService: ScraperService) {

    }

    async cache(asin: string) {
        const result = await this.productRepo.findByAsin(asin).catch((err: any) => {
            /* foo */
        });

        if (result !== undefined) {
            return result;
        } else {
            const productData = await this.scraperService.findAsin(asin);
            if (productData !== undefined && productData.length > 0) {
                const asins = this.getProductAsins(productData);
                return await this.productRepo.save({products: productData, asins});

            } else {
                return undefined;
            }
        }
    }

    getProductAsins(products: any[]) {
        const asins: any[] = [];
        products.forEach((data) => {
            this.asinFields.forEach((field) => {
                if (data[field] !== undefined) {
                    asins.push(data[field]);
                }
            });
        });
        return asins;
    }

}

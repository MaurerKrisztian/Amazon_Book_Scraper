import { CacheService } from "../services/CacheService/CacheService";

export class ProductController {
    constructor( private readonly cacheService: CacheService) {
    }

    async findAndSave(req: any, res: any) {
        const asin = req.body.asin;
        const result = await this.cacheService.cache(asin);
        if (result !== undefined) {
            res.status(200).send(result);
        } else {
            res.status(404).send("product not found.");
        }
    }
}

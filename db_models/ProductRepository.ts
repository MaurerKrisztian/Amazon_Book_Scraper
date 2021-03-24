import { IProductRepository } from "./IProductRepository";
import { Database } from "./Database";

export class ProductRepository implements IProductRepository {
    constructor( private readonly db: Database) {

    }

    async findByAsin(asin: string) {
        const connection = await this.db.getCollection("products").catch(() => {console.log("db error"); });
        const res = await connection.findOne({ asins: asin}).catch(() => {console.log("db error"); });
        if (res) {
            return res;
        }
        return;
    }


    async save(product: any) {
        const connection = await this.db.getCollection("products").catch((err: any) => {console.log("db error"); });
        return await connection.insertOne(product);
    }
}

export interface IProductRepository {
    findByAsin(asin: string): Promise<any>;
    save(product: any): Promise<any>;
}

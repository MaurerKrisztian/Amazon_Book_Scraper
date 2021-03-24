export class Database {

    constructor(private readonly connection: any) {
    }

    async getCollection(collectionName: string) {
        return await this.connection.then(async function (client: any) {
            const db = client.db("Crawler");
            return db.collection(collectionName);
        }).catch(() => {
            console.log("db error");
        });
    }
}

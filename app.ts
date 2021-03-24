import {ProductController} from "./controllers/ProductController";
import {ScraperServiceOptions} from "./services/ScraperService/ScraperServiceOptions";
import {ScraperService} from "./services/ScraperService/ScraperService";
import {Database} from "./db_models/Database";
import {ProductRepository} from "./db_models/ProductRepository";
import {CacheService} from "./services/CacheService/CacheService";

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const bodyParser = require('body-parser');
require('dotenv/config');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

const PORT = 3000;


const spec = path.join(__dirname, 'swagger-doc.yaml');
app.use('/spec', express.static(spec));

//Setup swagger validation
app.use(
    OpenApiValidator.middleware({
            apiSpec: './swagger-doc.yaml',
            validateResponses: true,
        }
    ),
);
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// setup swagger UI
const swaggerDocument = YAML.load('./swagger-doc.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//setup controller
const URI = process.env.DB_URI
const connect = MongoClient.connect(URI)


const VISIBLE_BROWSER: boolean = true;
const productController = new ProductController(new CacheService(new ProductRepository(new Database(connect)), new ScraperService(
    new ScraperServiceOptions(),
    VISIBLE_BROWSER
)))


//Routes
app.post("/v1/products", async (req: any, res: any) => {
    return await productController.findAndSave(req, res)
});

app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});

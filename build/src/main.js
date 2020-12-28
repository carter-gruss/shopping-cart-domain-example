"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const dotenv = require("dotenv");
const produce_controller_1 = require("./produce/produce.controller");
const bodyParser = require("body-parser");
const logger_middleware_1 = require("./common/logger.middleware");
dotenv.config();
// ----------------------------------------
//  Application Bootstrap
// ---
//  Monday, December 28 2020
// ----------------------------------------
async function bootstrap() {
    const port = process.env.PORT || 8000;
    const env = process.env.NODE_ENV || 'development';
    const app = new app_1.AppServer({
        port: Number(port),
        environment: env,
        controllers: [produce_controller_1.ProduceController],
        middleware: [bodyParser.json(), logger_middleware_1.logHandler],
    });
    app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map
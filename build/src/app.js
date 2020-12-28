"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const express = require("express");
const interfaces_1 = require("./interfaces");
const tsyringe_1 = require("tsyringe");
class AppServer {
    constructor(params) {
        this._apiPath = '/api';
        try {
            this.app = express();
            this.port = params.port;
            // Validate the environment variable
            if (!interfaces_1.ALL_ENVIRONMENTS.includes(params.environment)) {
                const validEnv = interfaces_1.ALL_ENVIRONMENTS.join(', ').trim();
                throw new Error(`${params.environment} is not a valid environment. Use ${validEnv}`);
            }
            this.env = params.environment;
            this._initMiddleware(params.middleware);
            this._initRouteControllers(`${this._apiPath}`, params.controllers);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    _initMiddleware(middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    _initRouteControllers(path = this._apiPath, controllers) {
        controllers.forEach(controller => {
            const apiControllerInstance = tsyringe_1.container.resolve(controller);
            this.app.use(`${path}`, apiControllerInstance.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application is running on: http://localhost:${this.port}`);
            console.log(`Application environment: ${this.env.toUpperCase()}`);
        });
    }
}
exports.AppServer = AppServer;
//# sourceMappingURL=app.js.map
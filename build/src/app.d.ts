import { Application } from 'express';
import { Controller, Environment, ServerMiddleware } from './interfaces';
interface AppParams {
    port: number;
    environment: string;
    middleware: ServerMiddleware[];
    controllers: Controller[];
}
export declare class AppServer {
    app: Application;
    port: number;
    env: Environment;
    private _apiPath;
    constructor(params: AppParams);
    private _initMiddleware;
    private _initRouteControllers;
    listen(): void;
}
export {};

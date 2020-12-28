import { RequestHandler, Router } from 'express';
export declare const ALL_ENVIRONMENTS: string[];
export declare type Environment = typeof ALL_ENVIRONMENTS[number];
export declare type ServerMiddleware = RequestHandler;
export interface ServerController {
    router: Router;
    path: string;
    /**
     * Initialize all API routes associated with controller
     */
    initRoutes(): void;
}
export declare type Controller = {
    new (): ServerController;
};

import { NextFunction, Request, Response, Router } from 'express';
import { ServerController } from '../interfaces';
export declare class ProduceController implements ServerController {
    router: Router;
    path: string;
    constructor();
    initRoutes(): void;
    findAllProduce(req: Request, res: Response, next: NextFunction): void;
    findProduceById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createNewProduce(req: Request, res: Response, next: NextFunction): Promise<void>;
}

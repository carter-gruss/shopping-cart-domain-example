import {NextFunction, Request, Response, Router} from 'express';
import {singleton} from 'tsyringe';
import {ServerController} from '../interfaces';

// ----------------------------------------
//  Produce API: Controller for accessing fresh produce
//
// * GET / Returns all available produce
// * POST / Creates a new produce
// * GET /:produceId/ Returns a single produce, found by id
// ---
//  Monday, December 28 2020
// ----------------------------------------
@singleton()
export class ProduceController implements ServerController {
  router: Router = Router();
  path = '/produce';

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.path}`, this.findAllProduce.bind(this));
    this.router.get(`${this.path}/:produceId`, this.findProduceById.bind(this));
    this.router.post(`${this.path}`, this.createNewProduce.bind(this));
  }

  findAllProduce(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).send({data: 'Hizzah'});
    } catch (error) {
      next(error);
    }
  }

  async findProduceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).send({
        data: 'Hizzah',
      });
    } catch (error) {
      next(error);
    }
  }

  async createNewProduce(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(201);
      res.send();
    } catch (error) {
      next(error);
    }
  }
}

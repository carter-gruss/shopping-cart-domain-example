import {Application} from 'express';
import * as express from 'express';
import {
  ALL_ENVIRONMENTS,
  Environment,
  ServerController,
  ServerMiddleware,
} from './interfaces';

interface AppParams {
  port: number;
  environment: string;
  middleware: ServerMiddleware[];
  controllers: ServerController[];
}

export class AppServer {
  public app: Application;
  public port: number;
  public env: Environment;

  constructor(params: AppParams) {
    try {
      this.app = express();
      this.port = params.port;

      // Validate the environment variable
      if (!ALL_ENVIRONMENTS.includes(params.environment)) {
        const validEnv = ALL_ENVIRONMENTS.join(', ').trim();
        throw new Error(
          `${params.environment} is not a valid environment. Use ${validEnv}`
        );
      }
      this.env = params.environment;

      this._initMiddleware(params.middleware);
      this._initRouteControllers(params.controllers);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private _initMiddleware(middlewares: ServerMiddleware[]): void {
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  private _initRouteControllers(controllers: ServerController[]): void {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Application is running on: http://localhost:${this.port}`);
      console.log(`Application environment: ${this.env.toUpperCase()}`);
    });
  }
}

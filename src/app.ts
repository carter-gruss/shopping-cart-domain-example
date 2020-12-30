import {Application} from 'express';
import * as express from 'express';
import {
  ALL_ENVIRONMENTS,
  Controller,
  Environment,
  ServerMiddleware,
} from './interfaces';
import {container} from 'tsyringe';
import createAppContainer from './core/app-container';

interface AppParams {
  port: number;
  environment: string;
  middleware: ServerMiddleware[];
  controllers: Controller[];
}

export class AppServer {
  public app: Application;
  public port: number;
  public env: Environment;
  private _apiPath = '/api';

  constructor(params: AppParams) {
    try {
      // Bootstrap the app by first registering all dependencies.
      createAppContainer();

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
      this._initRouteControllers(`${this._apiPath}`, params.controllers);
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

  private _initRouteControllers(
    path = this._apiPath,
    controllers: Controller[]
  ): void {
    controllers.forEach(controller => {
      const apiControllerInstance = container.resolve(controller);
      this.app.use(`${path}`, apiControllerInstance.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Application is running on: http://localhost:${this.port}`);
      console.log(`Application environment: ${this.env.toUpperCase()}`);
    });
  }
}

import {RequestHandler, Router} from 'express';

export const ALL_ENVIRONMENTS = ['production', 'development', 'local'];
export type Environment = typeof ALL_ENVIRONMENTS[number];

export type ServerMiddleware = RequestHandler;

export interface ServerController {
  router: Router;
  path: string;
}

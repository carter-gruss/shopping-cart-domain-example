import 'reflect-metadata';
import {AppServer} from './app';
import * as dotenv from 'dotenv';
import {ProduceController} from './produce/produce.controller';
import bodyParser = require('body-parser');
import {logHandler} from './common/logger.middleware';

dotenv.config();

// ----------------------------------------
//  Application Bootstrap
// ---
//  Monday, December 28 2020
// ----------------------------------------

async function bootstrap() {
  const port = process.env.PORT || 8000;
  const env = process.env.NODE_ENV || 'development';

  const app = new AppServer({
    port: Number(port),
    environment: env,
    controllers: [ProduceController],
    middleware: [bodyParser.json(), logHandler],
  });

  app.listen();
}

bootstrap();

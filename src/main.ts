import {AppServer} from './app';
import * as dotenv from 'dotenv';

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
    controllers: [],
    middleware: [],
  });

  app.listen();
}

bootstrap();

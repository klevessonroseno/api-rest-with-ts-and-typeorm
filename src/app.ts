import * as express from 'express';
import { Express } from 'express';
import routes from './routes/routes';

class App {
  private server: Express;
  
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  getServer(): Express {
    return this.server;
  }

  middlewares(): void {
    this.server.use(express.json());
  }

  routes(): void {
    this.server.use(routes);
  }
}

export default new App().getServer();
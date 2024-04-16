import expressRequestId from '@baseland-io/express-request-id/dist';
import * as config from '@src/config';
import { type Controller } from '@src/controller';
import { HttpException } from '@src/exceptions';
import { errorMiddleware, responseMiddleware } from '@src/middlewares';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export default class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.checkPath();
    this.initializeErrorHandlers();
  }

  private checkPath() {
    this.app.get('/alive', (_request, response) => response.sendStatus(200));
  }

  private initializeMiddleware() {
    this.app.use(helmet());
    this.app.use(
      cors({
        exposedHeaders: ['Authorization', `${config.authHeaderKey}`],
      })
    );
    this.app.use(expressRequestId());
    this.app.use(cookieParser());
    this.app.use(express.json());

    this.app.use(responseMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeErrorHandlers() {
    // Register the catch-all route handler for unmatched routes
    this.app.all('*', (request, _response, next) => {
      // Create a new HttpException for the 404 error
      const error = new HttpException(
        `Can't find ${request.originalUrl} on the server!`,
        404
      );
      // Pass the error to the next middleware (which is errorMiddleware)
      next(error);
    });
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(config.port, () => {
      console.log(`Server is running at: http://localhost:${config.port}`);
    });
  }
}

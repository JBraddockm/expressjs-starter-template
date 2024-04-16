import Controller from '@src/controller/controller.type';
import { NextFunction, Request, Response, Router } from 'express';

class RootController implements Controller {
  public path: string = '/hello';

  public router: Router = Router({ mergeParams: true });

  constructor() {
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get(this.path, this.root);
  }

  private root(_request: Request, response: Response, _next: NextFunction) {
    response.send({ message: 'Hello World!' });
  }
}

export const rootController = new RootController();

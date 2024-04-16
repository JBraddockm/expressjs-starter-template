import { HttpException } from '@src/exceptions';

export class NotFoundException extends HttpException {
  constructor(id: string) {
    super(`Resource with id ${id} not found`, 404);
  }
}

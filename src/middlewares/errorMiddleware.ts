import { HttpException } from '@src/exceptions';
import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  response.status(error.statusCode).json({
    timestamp: error.timestamp,
    code: error.statusCode,
    status: error.status,
    message: error.message || 'Something went wrong',
    path: request.path,
  });
}

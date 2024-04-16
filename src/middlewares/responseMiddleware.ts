import { NextFunction, Request, Response } from 'express';

export function responseMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const oldSend = response.send;

  // Override the response.send method
  response.send = (data) => {
    // Check if the status code is not in the 2xx range (error response)
    if (
      response.statusCode &&
      response.statusCode >= 200 &&
      response.statusCode < 300
    ) {
      response.send = oldSend;

      return response.send({
        code: response.statusCode,
        message: 'success',
        data: data,
        request_id: request.id,
      });
    }

    // If the status code is in the 2xx range (successful), call the original send method
    return oldSend.call(response, data);
  };
  next();
}

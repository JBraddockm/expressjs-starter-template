export class HttpException extends Error {
  statusCode: number;

  status?: 'fail' | 'error';

  message: string;

  error: string | null;

  timestamp: Date;

  constructor(message: string, statusCode: number, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.message = message;
    this.error = error || null;
    this.timestamp = new Date();
  }
}

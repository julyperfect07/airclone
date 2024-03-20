class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (statusCode: number, message: string) => {
  const error = new CustomError(statusCode, message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

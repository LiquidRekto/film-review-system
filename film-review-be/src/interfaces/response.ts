export class APIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    //   // Ensures proper stack trace (only available in V8 environments)
    //   if (Error.captureStackTrace) {
    //     Error.captureStackTrace(this, APIError);
    //   }
  }
}

export class APIResponse {
  message?: string;
  data?: any;
  constructor(message: string = "", data: any = "") {
    this.message = message;
    this.data = data;
  }
}

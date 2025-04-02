/**
 * TyDeT Core Error.
 * Class for general errors.
 */
export class CoreError extends Error {
  constructor(message?: string) {
    super();
    Object.setPrototypeOf(this, CoreError.prototype);
    if (message) this.message = message;
    if (Error.captureStackTrace) Error.captureStackTrace(this, CoreError);
  }
}
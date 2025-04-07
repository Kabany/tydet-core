/**
 * TyDeT Core Error.
 * Class for general errors.
 */
export class CoreError extends Error {
  constructor(message?: string) {
    super();
    Object.setPrototypeOf(this, CoreError.prototype);
    this.name = this.constructor.name
    if (message) this.message = message;
    if (Error.captureStackTrace) Error.captureStackTrace(this, CoreError);
  }
}
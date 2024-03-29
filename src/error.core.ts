/**
 * TyDeT Core Error.
 * Class for general errors.
 */
export class CoreError extends Error {
  name: string

  constructor(message?: string) {
    super(message);
    this.name = "CoreError";
    this.message = message;
    this.stack = (new Error(message)).stack;  //`${this.message}\n${new Error().stack}`;
  }
}
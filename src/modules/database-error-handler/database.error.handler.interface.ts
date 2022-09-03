export const IDatabaseErrorHandler = Symbol('IDatabaseErrorHandler');

export interface IDatabaseErrorHandler {
  HandleError(error: any): void;
}

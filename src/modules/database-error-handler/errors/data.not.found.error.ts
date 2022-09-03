import { BaseDatabaseError } from '@modules/database-error-handler/errors/base.database.error';

export class DataNotFoundError extends BaseDatabaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

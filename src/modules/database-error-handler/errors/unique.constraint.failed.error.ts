import { BaseDatabaseError } from '@modules/database-error-handler/errors/base.database.error';

export class UniqueConstraintFailedError extends BaseDatabaseError {
  fieldName: string;
  constructor(fieldName: string, message?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.fieldName = fieldName;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

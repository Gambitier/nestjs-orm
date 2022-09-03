import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  DataNotFoundError,
  UniqueConstraintFailedError,
} from '@modules/database-error-handler/errors';
import { PrismaError } from '@modules/database-error-handler/prisma/enums/prisma.error.code.enum';
import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

/////////////////////////////////////////////////////////////////////

@Injectable()
export class PrismaDatabaseErrorHandler implements IDatabaseErrorHandler {
  HandleError(error: any): void {
    this.HandlePrismaErrors(error);
  }

  HandlePrismaErrors = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
      const exception = error as PrismaClientKnownRequestError;
      this.HandlePrismaClientKnownRequestError(exception);
    } else if (error.name === 'NotFoundError') {
      throw new DataNotFoundError(error.message);
    }

    throw error;
  };

  HandlePrismaClientKnownRequestError(error: PrismaClientKnownRequestError) {
    const errorCode = error.code;

    switch (errorCode) {
      case PrismaError.UniqueConstraintViolation: {
        const msg = `${error.meta.target[0]} already in use`;
        throw new UniqueConstraintFailedError(error.meta.target[0], msg);
      }
    }
  }
}

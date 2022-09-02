import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { PrismaError } from '@modules/database-error-handler/prisma/enums/prisma.error.code.enum';
import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

/////////////////////////////////////////////////////////////////////

export class PrismaDatabaseErrorHandler implements IDatabaseErrorHandler {
  HandleError(error: any): void {
    this.HandlePrismaErrors(error);
  }

  HandlePrismaErrors = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
      const exception = error as PrismaClientKnownRequestError;
      this.HandlePrismaClientKnownRequestError(exception);
    }

    throw error;
  };

  HandlePrismaClientKnownRequestError(error: PrismaClientKnownRequestError) {
    const errorCode = error.code;

    switch (errorCode) {
      case PrismaError.UniqueConstraintViolation: {
        const msg = `${error.meta.target[0]} already in use`;
        throw new BadRequestException(msg);
      }
    }
  }
}
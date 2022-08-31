import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/prisma.helpers/enums/prisma.error.code.enum';

export const HandlePrismaErrors = (error) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const exception = error as PrismaClientKnownRequestError;
    HandlePrismaClientKnownRequestError(exception);
  }

  throw error;
};

function HandlePrismaClientKnownRequestError(
  error: PrismaClientKnownRequestError,
) {
  if (error.code === PrismaError.UniqueConstraintViolation) {
    const msg = `Error: ${error.meta.target[0]} already in use`;
    throw new BadRequestException(msg);
  }
}

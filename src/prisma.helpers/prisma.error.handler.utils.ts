import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/prisma.helpers/enums/prisma.error.code.enum';

/////////////////////////////////////////////////////////////////////

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
  const errorCode = error.code;

  switch (errorCode) {
    case PrismaError.UniqueConstraintViolation: {
      const msg = `${error.meta.target[0]} already in use`;
      throw new BadRequestException(msg);
    }
  }
}

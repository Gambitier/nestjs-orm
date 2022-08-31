import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const HandlePrismaErrors = (error) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const exception = error as PrismaClientKnownRequestError;
    console.log(exception.message);
    throw error;
  }

  throw error;
};

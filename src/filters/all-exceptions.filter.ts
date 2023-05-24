import { ExceptionResponseBody } from '@common/types';
import {
  DataNotFoundError,
  UniqueConstraintFailedError,
} from '@modules/database-error-handler/errors';
import { BaseDatabaseError } from '@modules/database-error-handler/errors/base.database.error';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

//////////////////////////////////////////////////////////////////

type ClassValidatorErrorResponse = {
  statusCode: any;
  message: any;
  error: any;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly _logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let mesage =
      error instanceof HttpException ? error.message : 'Something went wrong';

    if (error instanceof BaseDatabaseError) {
      ({ httpStatus, mesage } = this.mapDatabaseError(error));
    }

    const responseBody: ExceptionResponseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: mesage,
      response:
        error instanceof BadRequestException
          ? (error.getResponse() as ClassValidatorErrorResponse)?.message ??
            null
          : null,
    };

    this._logger.error({
      ...responseBody,
      stackTrace:
        error instanceof BaseDatabaseError ||
        error instanceof HttpException ||
        error instanceof Error
          ? error.stack
          : undefined,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private mapDatabaseError(error: BaseDatabaseError) {
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let mesage = 'Something went wrong with database operation';

    if (
      error instanceof DataNotFoundError ||
      error instanceof UniqueConstraintFailedError
    ) {
      httpStatus = HttpStatus.BAD_REQUEST;
      mesage = error.message;
    }

    return { httpStatus, mesage };
  }
}

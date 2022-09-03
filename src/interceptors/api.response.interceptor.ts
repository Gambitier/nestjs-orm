/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIResponse } from '@common/types';
import { AuditData } from '@modules/audit-logs/common/audit.data.type';
import {
  AuditMetadata,
  AUDIT_KEY,
} from '@modules/audit-logs/common/audit.decorator';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/////////////////////////////////////////////////////////////////////

@Injectable()
export class APIResponseInterceptor implements NestInterceptor {
  /**
   *
   */
  constructor(
    // @Inject(IAuditService)
    // private readonly auditService: IAuditService,

    private reflector: Reflector,
  ) {}

  getAuditData(req: Request, res: APIResponse, route: string) {
    //

    if (req.headers.authorization) {
      delete req.headers.authorization;
    }

    const entity: AuditData = {
      created_at: new Date(),
      user: req.user,
      route: route?.toLowerCase(),
      request: {
        method: req?.method ?? null,
        host: req?.hostname ?? null,
        body: req?.body ?? null,
        headers: req?.headers ?? null,
        url: req?.originalUrl ?? null,
        params: req?.params ?? null,
      },
      response: {
        status: res.status,
        statusCode: res.statusCode,
        message: res.message,
        data: res.data,
      },
      entityType: null,
      error: null,
    };

    return entity;
  }

  responseHandler = (response: APIResponse) => {
    const apiResponse = {
      status: response.status ?? 'Suceess',
      statusCode: response.statusCode, // TODO add http status code here from httpResponse
      message: response.message,
      data: response.data,
    };

    return apiResponse;
  };

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request: Request = httpContext.getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: Response = httpContext.getRequest();

    return next.handle().pipe(
      map(async (data: any) => {
        if (data instanceof StreamableFile || data instanceof Buffer) {
          return data;
        }

        const auditMetadata: AuditMetadata =
          this.reflector.getAllAndOverride<AuditMetadata>(AUDIT_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

        const auditKey = auditMetadata?.AuditKey;
        const auditData = this.getAuditData(request, data, auditKey);

        // TODO implement auditService
        // if (auditData != null) {
        //   await this.auditService.recordAudit(auditData);
        // }

        return this.responseHandler(data);
      }),
    );
  }
}

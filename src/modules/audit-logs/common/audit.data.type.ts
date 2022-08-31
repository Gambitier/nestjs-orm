import { HttpStatus } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

///////////////////////////////////////////////

export interface ParamsDict {
  [key: string]: string;
}

export type AuditData = {
  created_at: Date;
  user: Express.User;
  route: string;
  request: {
    method: string;
    host: string;
    body: any;
    headers: IncomingHttpHeaders;
    url: string;
    params: ParamsDict;
  };
  response: {
    status: string;
    statusCode?: HttpStatus;
    message: string;
    data: any;
  };
  entityType: any;
  error: any;
};

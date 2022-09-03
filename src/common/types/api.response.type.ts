import { HttpStatus } from '@nestjs/common';

export type ApiResponseStatus = 'Suceess' | 'Failuare';

export type APIResponse = {
  status?: ApiResponseStatus;
  message: string;
  statusCode?: HttpStatus;
  data: any;
};

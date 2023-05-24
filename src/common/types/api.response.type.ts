import { HttpStatus } from '@nestjs/common';

export type ApiResponseStatus = 'Suceess' | 'Failuare';

export type APIResponse<optnalType = any> = {
  status?: ApiResponseStatus;
  message: string;
  statusCode?: HttpStatus;
  data: optnalType;
};

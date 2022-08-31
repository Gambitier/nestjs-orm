import { HttpStatus } from '@nestjs/common';

export type ApiResponseStatus = 'Suceess' | 'Failuare';

export type ApiResponse = {
  status?: ApiResponseStatus;
  message: string;
  statusCode?: HttpStatus;
  data: any;
};

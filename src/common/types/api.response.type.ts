import { HttpStatus } from '@nestjs/common';

export type ApiResponse = {
  message: string;
  statusCode: HttpStatus;
  data: any;
};

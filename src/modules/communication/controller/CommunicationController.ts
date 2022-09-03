import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIResponse } from 'src/common/types';
import { AllowAnonymous } from 'src/modules/auth/common';
import { IEmailService } from '../services';

@Controller('Communication')
@ApiTags('Communication')
export class CommunicationController {
  /**
   *
   */
  constructor(
    @Inject(IEmailService)
    private readonly emailService: IEmailService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/send-test-email')
  @AllowAnonymous()
  async sendTestEmail(): Promise<APIResponse> {
    //

    this.emailService.sendExampleEmail();
    this.emailService.sendExampleEmail_2();

    const apiResponse: APIResponse = {
      message: 'Communications retrieved successfully!',
      statusCode: HttpStatus.OK,
      data: null,
    };

    return apiResponse;
  }
}

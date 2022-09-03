import { Injectable } from '@nestjs/common';
import { ISmsService } from './ISmsService';

@Injectable()
export class SmsService implements ISmsService {
  // TODO use npm/nest-typed-config
  environmentVariablesService: any;

  // TODO fix twilioService not able to resolve
  twilioService: any;
  // public constructor(private readonly twilioService: TwilioService) {}

  async sendSMS(
    targetPhoneNumber: string,
    countryCode: string,
    body: string,
  ): Promise<void> {
    const callbackUrl: string =
      this.environmentVariablesService.getTwilioSmsWebHook();

    try {
      const msg = await this.twilioService.client.messages.create({
        body: body,
        from: this.environmentVariablesService.getSakshamPlatformPhoneNumber(),
        to: `${countryCode}${targetPhoneNumber}`,
        statusCallback: callbackUrl,
      });

      console.log('send twilio message response', JSON.stringify(msg));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

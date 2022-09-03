export const ISmsService = Symbol('ISmsService');

export interface ISmsService {
  sendSMS(
    targetPhoneNumber: string,
    countryCode: string,
    body: string,
  ): Promise<void>;
}

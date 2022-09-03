export const IEmailService = Symbol('IEmailService');

export interface IEmailService {
  sendExampleEmail(): void;
  sendExampleEmail_2(): void;
  sendResetPasswordEmail(args: {
    resetLink: string;
    email: string;
  }): Promise<boolean>;
}

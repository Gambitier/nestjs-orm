export const IEmailService = Symbol('IEmailService');

export interface IEmailService {
  sendExampleEmail(): void;
  sendExampleEmail_2(): void;

  sendResetPasswordLinkEmail(args: {
    resetLink: string;
    email: string;
  }): Promise<boolean>;

  sendPasswordResetSuccessEmail(args: {
    firstName: string;
    email: string;
  }): Promise<boolean>;
}

import * as QrCode from 'qrcode';

export async function generateQRCode(text: string): Promise<string> {
  const code = await QrCode.toDataURL(text);
  return code;
}

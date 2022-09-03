import { generatePassword, hashData } from '@common/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import * as _ from 'lodash';

export class UpdatePasswordDto {
  /**
   *
   */
  constructor(props: UpdatePasswordDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  // TODO enable password strength validation
  // @Matches(passwordRegex, {
  //   message:
  //     'New password does not fit the security criteria. \
  //      The new password must be between 7 to 15 character long, \
  //      should have atleast 1 digit, 1 special character, \
  //      1 lower-case and 1 uppercase letter.',
  // })
  @Transform(
    ({ value }) => {
      if (_.isEmpty(value)) {
        value = generatePassword();
      }
      return hashData(value);
    },
    { toClassOnly: true },
  )
  @Expose()
  newPassword: string;
}

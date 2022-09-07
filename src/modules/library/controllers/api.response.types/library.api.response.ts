import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateLibraryApiResponse {
  constructor(props: CreateLibraryApiResponse) {
    Object.assign(this, props);
  }

  // @ApiProperty()
  // @Type(() => JwtUserData)
  // @Expose()
  // user: JwtUserData;

  // @ApiProperty()
  // @Type(() => TokenDto)
  // @Expose()
  // token: TokenDto;
  @ApiProperty()
  @Expose()
  data: any;
}

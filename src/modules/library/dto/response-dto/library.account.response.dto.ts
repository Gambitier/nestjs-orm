import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class LibraryUserAccountDto {
  constructor(props: LibraryUserAccountDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  deleted: Date;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Exclude()
  role: string;

  @ApiProperty()
  @Expose()
  libraryId: string;
}

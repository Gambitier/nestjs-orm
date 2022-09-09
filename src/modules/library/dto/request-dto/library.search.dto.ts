import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class LibrarySearchDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly state?: string;

  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  readonly limit: number;

  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  readonly offset: number;
}

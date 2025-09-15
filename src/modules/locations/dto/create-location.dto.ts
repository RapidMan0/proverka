import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, MinLength, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @ApiProperty({ example: 'Russia' })
  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: 'Country is required' })
  @MinLength(2, { message: 'Country must be at least $constraint1 characters' })
  @Matches(/^[\p{L}\s'-]+$/u, { message: 'Country must not contain numbers or symbols' })
  country: string;

  @ApiProperty({ example: 'Moscow' })
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  @MinLength(2, { message: 'City must be at least $constraint1 characters' })
  @Matches(/^[\p{L}\s'-]+$/u, { message: 'City must not contain numbers or symbols' })
  city: string;

  @ApiPropertyOptional({ example: 1, description: 'ID пользователя-владельца' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'userId must be an integer' })
  userId?: number;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Location {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Russia' })
  country: string;

  @ApiProperty({ example: 'Moscow' })
  city: string;

  @ApiPropertyOptional({ example: 1, description: 'ID пользователя-владельца' })
  userId?: number;

  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }
}

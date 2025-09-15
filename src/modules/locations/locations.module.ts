import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // импортируем, чтобы иметь доступ к UsersService
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

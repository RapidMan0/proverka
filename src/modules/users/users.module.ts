import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [forwardRef(() => LocationsModule)], // forwardRef для круговой зависимости
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

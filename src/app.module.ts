import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [UsersModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

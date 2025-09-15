import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocationsService {
  private locations: Location[] = [
    new Location({ id: 1, name: 'Moscow', description: 'Head office' }),
    new Location({ id: 2, name: 'Saint Petersburg' }),
  ];
  private nextId = 3;

  constructor(private readonly usersService: UsersService) {}

  create(dto: CreateLocationDto) {
    const loc = new Location({ id: this.nextId++, ...dto });
    this.locations.push(loc);
    return loc;
  }

  findAll() {
    return this.locations;
  }

  findOne(id: number) {
    const loc = this.locations.find(l => l.id === id);
    if (!loc) throw new NotFoundException(`Location #${id} not found`);
    return loc;
  }

  update(id: number, dto: UpdateLocationDto) {
    const loc = this.findOne(id);
    Object.assign(loc, dto);
    return loc;
  }

  remove(id: number) {
    const index = this.locations.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Location #${id} not found`);
    const removed = this.locations.splice(index, 1)[0];

    // Очистить ссылку у пользователей, которые ссылались на эту локацию
    const users = this.usersService.findAll();
    users
      .filter(u => u.locationId === id)
      .forEach(u => {
        // обновляем пользователя, убирая связь с локацией
        this.usersService.update(u.id, { locationId: undefined } as any);
      });

    return removed;
  }

  getUsersByLocation(id: number) {
    // использует UsersService для получения пользователей по локации
    return this.usersService.findAll().filter(u => u.locationId === id);
  }
}

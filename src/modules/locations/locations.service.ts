import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocationsService {
  private locations: Location[] = [
    new Location({ id: 1, country: 'Russia', city: 'Moscow', userId: 1 }),
    new Location({ id: 2, country: 'Russia', city: 'Saint Petersburg', userId: 2 }),
  ];
  private _nextId = 3;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  private ensureUserExistsIfProvided(userId?: number) {
    if (userId === undefined || userId === null) return;
    try {
      this.usersService.findOne(userId);
    } catch {
      throw new BadRequestException(`User #${userId} not found`);
    }
  }

  private getNextId() {
    return this._nextId++;
  }

  create(dto: CreateLocationDto) {
    this.ensureUserExistsIfProvided(dto.userId);
    const loc = new Location({ id: this.getNextId(), ...dto });
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
    if (dto.userId !== undefined) {
      this.ensureUserExistsIfProvided(dto.userId);
    }
    Object.assign(loc, dto);
    return loc;
  }

  remove(id: number) {
    const index = this.locations.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Location #${id} not found`);
    return this.locations.splice(index, 1)[0];
  }

  // возвращает владельца локации как объект пользователя (через UsersService)
  getOwnerByLocation(id: number) {
    const loc = this.findOne(id);
    if (!loc.userId) return null;
    return this.usersService.findOne(loc.userId);
  }

  // возвращает локацию по userId (или null)
  getByUserId(userId: number) {
    return this.locations.find(l => l.userId === userId) ?? null;
  }
}

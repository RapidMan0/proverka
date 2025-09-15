import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Location } from '../locations/entities/location.entity'; // <-- добавлено

@Injectable()
export class UsersService {
  private users: User[] = [
    new User({ id: 1, name: 'Ivan Petrov', email: 'ivan.petrov@example.com', locationId: 1 }),
    new User({ id: 2, name: 'Olga Smirnova', email: 'olga.smirnova@example.com', locationId: 2 }),
    new User({ id: 3, name: 'Alex Johnson', locationId: 3 }),
  ];
  private nextId = 4;

  constructor(
    @Inject(forwardRef(() => LocationsService))
    private readonly locationsService: LocationsService,
  ) {}

  private attachLocation(user: User) {
    let location: Location | null = null; // <-- изменено: явный тип
    if (this.locationsService && user.locationId !== undefined && user.locationId !== null) {
      try {
        location = this.locationsService.findOne(user.locationId);
      } catch {
        location = null;
      }
    }
    return { ...user, location };
  }

  create(dto: CreateUserDto) {
    const user = new User({ id: this.nextId++, ...dto });
    this.users.push(user);
    return this.attachLocation(user);
  }

  findAll() {
    return this.users.map(u => this.attachLocation(u));
  }

  findOne(id: number) {
    const user = this.users.find((x: any) => x.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return this.attachLocation(user);
  }

  update(id: number, dto: UpdateUserDto) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    Object.assign(this.users[index], dto);
    return this.attachLocation(this.users[index]);
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    return this.users.splice(index, 1)[0];
  }
}

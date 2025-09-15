import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User({ id: 1, name: 'Ivan Petrov', email: 'ivan.petrov@example.com', locationId: 1 }),
    new User({ id: 2, name: 'Olga Smirnova', email: 'olga.smirnova@example.com', locationId: 2 }),
    new User({ id: 3, name: 'Alex Johnson', locationId: 3 }),
  ];
  private nextId = 4;

  create(dto: CreateUserDto) {
    const user = new User({ id: this.nextId++, ...dto });
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    return this.users.splice(index, 1)[0];
  }
}

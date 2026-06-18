import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // 内存数据库
  private users: User[] = [
    { id: 1, name: '小明', email: 'xiaoming@example.com' },
    { id: 2, name: '小红', email: 'xiaohong@example.com' },
  ];
  private nextId = 3;

  // 创建用户
  create(createUserDto: CreateUserDto): User {
    const newUser = { id: this.nextId++, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  // 查询所有用户
  findAll(): User[] {
    return this.users;
  }

  // 查询单个用户
  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return user;
  }

  // 更新用户
  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  // 删除用户
  remove(id: number): User {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}
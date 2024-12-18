import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(userData: { email: string; username: string; oauthId: string }) {
    const user = new User();
    user.id = this.users.length + 1;
    user.email = userData.email;
    user.username = userData.username;
    user.oauthId = userData.oauthId;
    this.users.push(user);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}

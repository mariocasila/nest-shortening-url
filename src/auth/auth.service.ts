import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateOAuthLogin(profile: any) {
    // Check if the user already exists in the database
    const user = await this.userService.findOneByEmail(profile.emails[0].value);

    if (!user) {
      // If the user doesn't exist, create a new user
      const newUser = await this.userService.createUser({
        email: profile.emails[0].value,
        username: profile.displayName,
        oauthId: profile.id,
      });
      return this.generateJwt(newUser);
    }

    // If the user exists, return the JWT token
    return this.generateJwt(user);
  }

  generateJwt(user: any) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    };
  }
}

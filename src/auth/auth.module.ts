import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),  // for loading environment variables
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },  // You can configure token expiration
    }),
    UserModule,    
  ],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { Request } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    // Redirects to Google for authentication
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req) {
    const { access_token } = await this.authService.generateJwt(req.user);
    return this.authService.generateJwt(req.user);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}

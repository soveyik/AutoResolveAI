import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * AuthController
 * Exposes REST endpoints for user registration and login.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.fullName, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}

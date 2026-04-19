import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

/**
 * AuthService
 * Handles business logic for user registration and authentication,
 * including password hashing and JWT token generation.
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(fullName: string, email: string, passwordPlain: string) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordPlain, salt);

    // Otomatik Rol Ataması: Eğer eklide 'admin' geçiyorsa admin yap
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';

    const user = this.userRepository.create({
      fullName,
      email,
      passwordHash,
      role
    });

    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      userId: user.id
    };
  }

  async login(email: string, passwordPlain: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      role: user.role
    };
  }
}

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(fullName: string, email: string, passwordPlain: string): Promise<{
        message: string;
        userId: string;
    }>;
    login(email: string, passwordPlain: string): Promise<{
        access_token: string;
        role: string;
    }>;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';

/**
 * AppModule
 * Root module of the application. Handles configuration tracking and imports feature modules.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'ticket_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TicketsModule,
    AuthModule,
  ],
})
export class AppModule {}

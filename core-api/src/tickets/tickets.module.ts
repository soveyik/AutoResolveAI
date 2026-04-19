import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

/**
 * TicketsModule
 * Registers dependencies, including AMQP client configurations.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    ClientsModule.register([
      {
        name: 'BACKGROUND_WORKER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:password123@localhost:5672'],
          queue: 'ticket_created_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}

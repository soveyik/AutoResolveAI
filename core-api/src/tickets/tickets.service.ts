import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { ClientProxy } from '@nestjs/microservices';

/**
 * TicketsService
 * Handles business logic for support tickets and dispatches events to the AMQP broker.
 */
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    
    @Inject('BACKGROUND_WORKER')
    private client: ClientProxy,
  ) {}

  async create(title: string, description: string) {
    const newTicket = this.ticketRepository.create({
      title,
      description,
    });

    const savedTicket = await this.ticketRepository.save(newTicket);
    this.client.emit('ticket_created', savedTicket);

    return savedTicket;
  }

  findAll() {
    return this.ticketRepository.find({ order: { createdAt: 'DESC' } });
  }
}

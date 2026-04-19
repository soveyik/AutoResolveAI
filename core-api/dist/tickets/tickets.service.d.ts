import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { ClientProxy } from '@nestjs/microservices';
export declare class TicketsService {
    private readonly ticketRepository;
    private client;
    constructor(ticketRepository: Repository<Ticket>, client: ClientProxy);
    create(title: string, description: string): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
}

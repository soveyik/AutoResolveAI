import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class TicketsService {
    private ticketsRepository;
    private rabbitClient;
    constructor(ticketsRepository: Repository<Ticket>, rabbitClient: ClientProxy);
    create(createTicketDto: CreateTicketDto): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
}

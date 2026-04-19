import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(body: any): Promise<import("./entities/ticket.entity").Ticket>;
    findAll(): Promise<import("./entities/ticket.entity").Ticket[]>;
}

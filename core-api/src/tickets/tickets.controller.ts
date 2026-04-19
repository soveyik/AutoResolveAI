import { Controller, Get, Post, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

/**
 * TicketsController
 * Exposes REST API endpoints for support ticket management.
 */
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() body: any) {
    return this.ticketsService.create(body.title, body.description);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }
}

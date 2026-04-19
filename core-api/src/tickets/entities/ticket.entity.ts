import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * Ticket Entity
 * Represents the support tickets table in the PostgreSQL database.
 */
@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 'OPEN' })
  status: string;

  @Column({ default: 'NORMAL' })
  priority: string;

  @Column({ default: 'GENERAL' })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}

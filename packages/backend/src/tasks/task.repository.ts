import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async create(data: {
    title: string;
    description?: string;
    completed?: boolean;
  }): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: {
          ...data,
          description: data.description ?? '', // Si `undefined`, se asigna ''
          completed: data.completed ?? false, // Si no se envía, lo establece en `false`
        },
      });
    } catch {
      throw new BadRequestException('Error al crear la tarea');
    }
  }

  async update(
    id: string,
    data: { title?: string; description?: string; completed?: boolean },
  ): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }
  }

  async delete(id: string): Promise<Task> {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }
  }
}

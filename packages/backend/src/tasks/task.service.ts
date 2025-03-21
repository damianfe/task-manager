import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description ?? '',
        completed: taskDto.completed ?? false,
      },
    });
  }

  async updateTask(id: string, data: Partial<TaskDto>): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }
  }

  async deleteTask(id: string): Promise<Task> {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }
  }
}

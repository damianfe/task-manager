import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas obtenida correctamente',
    type: [TaskDto],
  })
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
    type: TaskDto,
  })
  async createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea existente' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la tarea' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada correctamente',
    type: TaskDto,
  })
  async updateTask(
    @Param('id') id: string,
    @Body() body: Partial<TaskDto>, // ✅ Se usa Partial<TaskDto>
  ): Promise<Task> {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea eliminada correctamente',
    type: TaskDto,
  })
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}

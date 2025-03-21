import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    example: 'Hacer las compras',
    description: 'Título de la tarea',
  })
  title: string;

  @ApiProperty({
    example: 'Comprar pan, leche y huevos',
    description: 'Descripción de la tarea',
  })
  description?: string;

  @ApiProperty({
    example: 'pending',
    description: 'Estado de la tarea',
    default: 'pending',
  })
  status?: string;

  @ApiProperty({
    example: false,
    description: 'Indica si la tarea está completada o no',
    default: false,
  })
  completed?: boolean;
}

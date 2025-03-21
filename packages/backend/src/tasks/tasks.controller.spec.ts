import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from '@prisma/client';
import { TaskDto } from './dto/task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'getTasks').mockResolvedValue(result);

      expect(await controller.getTasks()).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should create and return a new task', async () => {
      const newTaskDto: TaskDto = { title: 'New Task', status: 'pending' };
      const newTask: Task = {
        id: '2',
        ...newTaskDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'createTask').mockResolvedValue(newTask);

      expect(await controller.createTask(newTaskDto)).toBe(newTask);
    });
  });

  describe('updateTask', () => {
    it('should update and return the updated task', async () => {
      const updatedTask: Task = {
        id: '1',
        title: 'Updated Task',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask);

      expect(await controller.updateTask(updatedTask.id, updatedTask)).toBe(
        updatedTask,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return it', async () => {
      const deletedTask: Task = {
        id: '3',
        title: 'Task to Delete',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'deleteTask').mockResolvedValue(deletedTask);

      expect(await controller.deleteTask(deletedTask.id)).toBe(deletedTask);
    });
  });
});

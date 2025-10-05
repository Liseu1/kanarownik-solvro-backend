import { Prisma } from "@prisma/client";

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../../src/database/database.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(protected database: DatabaseService) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const user = await this.database.task.create({
        data: {
          id: createTaskDto.id,
          title: createTaskDto.title,
          description: createTaskDto.description,
          dueDate: createTaskDto.dueDate,
        },
      });
      return user;
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2002") {
        throw new ConflictException("Task with such id may already exist.");
      }
      throw new InternalServerErrorException("Failed to create a task.");
    }
  }

  async findAll() {
    return this.database.task.findMany();
  }

  async findOne(id: number) {
    try {
      const task = await this.database.task.findUnique({ where: { id } });
      if (task === null) {
        throw new NotFoundException("Task with a given id does not exist");
      }
      return task;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to retrieve a task.");
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.database.task.update({
        where: { id },
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          dueDate: updateTaskDto.dueDate,
        },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2025") {
        throw new NotFoundException("User with a given id not found.");
      }
      throw new InternalServerErrorException("Failed to update a task.");
    }
  }

  async remove(id: number) {
    try {
      return await this.database.task.delete({
        where: { id },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2025") {
        throw new NotFoundException("Task with a given id not found.");
      }
      throw new InternalServerErrorException("Failed to remove a task.");
    }
  }
}

import { Injectable } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    console.warn(createTaskDto);
    return "This action adds a new task";
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id.toString()} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.warn(updateTaskDto);
    return `This action updates a #${id.toString()} task`;
  }

  remove(id: number) {
    return `This action removes a #${id.toString()} task`;
  }
}

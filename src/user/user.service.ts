import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    console.warn(createUserDto);
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id.toString()} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.warn(updateUserDto);
    return `This action updates a #${id.toString()} user`;
  }

  remove(id: number) {
    return `This action removes a #${id.toString()} user`;
  }
}

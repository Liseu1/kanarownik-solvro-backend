import { Prisma } from "@prisma/client";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../../src/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(protected database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.database.user.create({
        data: {
          githubId: createUserDto.githubId,
          assignedReviewerId: createUserDto.assignedReviewerId,
          username: createUserDto.username,
          name: createUserDto.name,
          lastName: createUserDto.lastName,
          isActive: createUserDto.isActive,
          role: createUserDto.role,
        },
      });
      return user;
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      switch (databaseError.code) {
        case "P2002": {
          throw new ConflictException(
            "User with such id/username may already exist.",
          );
        }
        case "P2003": {
          throw new BadRequestException(
            "Reviewer with a given id cannot be assigned.",
          );
        }
      }
      throw new InternalServerErrorException("Failed to create a user.");
    }
  }

  async findAll() {
    const users = await this.database.user.findMany({
      include: { assignedReviewer: true },
    });
    const completeUsers: GetUserDto[] = users.map((userRecord) => {
      return {
        githubId: userRecord.githubId,
        assignedReviewerId: userRecord.assignedReviewerId,
        assignedReviewerUsername:
          userRecord.assignedReviewer === null
            ? null
            : userRecord.assignedReviewer.username,
        username: userRecord.username,
        name: userRecord.name,
        lastName: userRecord.lastName,
        isActive: userRecord.isActive,
        role: userRecord.role,
      };
    });
    return completeUsers;
  }

  async findOne(id: number) {
    try {
      const userRecord = await this.database.user.findUnique({
        where: { githubId: id },
        include: {
          assignedReviewer: true,
        },
      });

      if (userRecord === null) {
        throw new NotFoundException(`User with a given id does not exist.`);
      }

      const user: GetUserDto = {
        githubId: userRecord.githubId,
        assignedReviewerId: userRecord.assignedReviewerId,
        assignedReviewerUsername:
          userRecord.assignedReviewer === null
            ? null
            : userRecord.assignedReviewer.username,
        username: userRecord.username,
        name: userRecord.name,
        lastName: userRecord.lastName,
        isActive: userRecord.isActive,
        role: userRecord.role,
      };

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException("Failed to retrieve a user.");
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.database.user.update({
        where: { githubId: id },
        data: {
          assignedReviewerId: updateUserDto.assignedReviewerId,
          username: updateUserDto.username,
          name: updateUserDto.name,
          lastName: updateUserDto.lastName,
          isActive: updateUserDto.isActive,
          role: updateUserDto.role,
        },
      });
      return user;
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      switch (databaseError.code) {
        case "P2002": {
          throw new ConflictException(
            `User with such username may already exist.`,
          );
        }
        case "P2003": {
          throw new BadRequestException(
            "Cannot assign a reviewer with a given id.",
          );
        }
        case "P2025": {
          throw new NotFoundException("User with a given id not found.");
        }
      }
      throw new InternalServerErrorException("Failed to update a user.");
    }
  }

  async remove(id: number) {
    try {
      return await this.database.user.delete({
        where: { githubId: id },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2025") {
        throw new NotFoundException("User with a given id not found.");
      }
      throw new InternalServerErrorException("Failed to remove a user.");
    }
  }
}

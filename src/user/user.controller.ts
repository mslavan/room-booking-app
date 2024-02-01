import { UserEntity } from './user.entity';
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User successfully created' })
  async createUser(@Body() user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found', type: UserEntity })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') userId: string): Promise<UserEntity | undefined> {
    return await this.userService.getUserById(userId);
  }
}

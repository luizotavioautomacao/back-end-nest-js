import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() body: { username: string, password: string }): Promise<User> {
        return this.userService.createUser(body.username, body.password);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Put(':id')
    async updateUser(
      @Param('id') id: string,
      @Body() body: { username: string; password: string },
    ): Promise<User> {
      return this.userService.updateUser(id, body.username, body.password);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
      return this.userService.deleteUser(id);
    }
}

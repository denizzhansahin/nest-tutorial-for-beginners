import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */


    @Get()//users ya da /users?role=value
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.userService.findOne(id)
    }


    @Get('interns')
    findAllInterns(){
        return []
    }


    @Post()
    create(@Body(ValidationPipe) createUser:CreateUserDto){
        return this.userService.create(createUser)
    }


    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) updateUser:UpdateUserDto){
        return this.userService.update(id,updateUser)
    }


    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id)
    }
}

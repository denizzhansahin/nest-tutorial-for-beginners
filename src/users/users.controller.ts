import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    findOne(@Param('id') id:string){
        return this.userService.findOne(+id)
    }


    @Get('interns')
    findAllInterns(){
        return []
    }


    @Post()
    create(@Body() user:{name:string, email:string, role:'INTERN' | 'ENGINEER' | 'ADMIN'}){
        return this.userService.create(user)
    }


    @Patch(':id')
    update(@Param('id') id:string, @Body() updateUser:{name?:string,email?:string,role?:'INTERN' | 'ENGINEER' | 'ADMIN'}){
        return this.userService.update(+id,updateUser)
    }


    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(+id)
    }
}

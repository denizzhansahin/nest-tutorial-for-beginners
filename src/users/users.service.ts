import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Denizhan Sahin",
            "email": "d@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ayse Yildirim",
            "email": "ayse.yildirim@example.com",
            "role": "ENGINEER",
        },
        {
            "id": 3,
            "name": "Mehmet Ozdemir",
            "email": "mehmet.ozdemir@example.com",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Fatma Kaya",
            "email": "fatma.kaya@example.com",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Ali Can",
            "email": "ali.can@example.com",
            "role": "INTERN",
        },
        {
            "id": 6,
            "name": "Esra Aksoy",
            "email": "esra.aksoy@example.com",
            "role": "INTERN",
        },
        {
            "id": 7,
            "name": "Burak Demir",
            "email": "burak.demir@example.com",
            "role": "INTERN",
        },
        {
            "id": 8,
            "name": "Selin Gunes",
            "email": "selin.gunes@example.com",
            "role": "ADMIN",
        },
        {
            "id": 9,
            "name": "Ozan Yildiz",
            "email": "ozan.yildiz@example.com",
            "role": "ADMIN",
        },
        {
            "id": 10,
            "name": "Emre Korkmaz",
            "email": "emre.korkmaz@example.com",
            "role": "ADMIN",
        }
    ]



    findAll(role?:'INTERN'|'ENGINEER' | 'ADMIN'){
        if(role) {
            const rolesArray =  this.users.filter(user=>user.role === role)
            if(rolesArray.length === 0) throw new 
            NotFoundException('User Role Not Found')
            return rolesArray
        }

        return this.users
    }

    findOne(id:number){
        const user = this.users.find(user=>user.id === id)

        if(!user) throw new NotFoundException('User Not Found')

        return user
    }

    create(createUserDto:CreateUserDto) {
        const userByHightestId = [...this.users].sort((a,b)=>b.id - a.id)
        const newUser = {
            id: userByHightestId[0].id+1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id:number,updateUserDto:UpdateUserDto){
        this.users = this.users.map(user=>{
            if(user.id===id){
                return {...user,...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }


    delete(id:number){
        const removeUser = this.findOne(id)
        this.users = this.users.filter(user=>user.id!==id)
        return removeUser
    }
    
}

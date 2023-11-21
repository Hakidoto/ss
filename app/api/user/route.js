import prisma from "@/app/components/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod' 
//Schema para validacion de los input

export async function POST(req) {
    try {
        const body = await req.json()
        const {email, username, password} = body

        //Valida si el email existe
        const existingEmail = await prisma.user.findUnique({
            where: {email: email}
        })
        if(existingEmail){
            return NextResponse.json({
                user: null, message: 'Ya existe un usuario con este email'}
                , {status: 409})
        }

         //Valida si el usuario existe
         const existingUser = await prisma.user.findUnique({
            where: {username: username}
        })
        if(existingUser){
            return NextResponse.json({
                user: null, message: 'Ya existe un usuario con este nombre'}
                , {status: 409})
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email, 
                password: hashedPassword
            }
        })

        return NextResponse.json({
            user: newUser, 
            message: 'Usuario creado'      
        }, {status: 201})

    } catch (error) {
        return NextResponse.json({
            message: 'Algo salio mal'      
        }, {status: 500})
    }
}
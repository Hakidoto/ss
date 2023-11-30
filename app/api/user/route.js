import prisma from "@/app/components/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

//Schema para validacion de los input

export async function POST(req) {
    try {
        const body = await req.json()
        const {correo, username, password} = body

        //Valida si el correo existe
        const existingEmail = await prisma.usrs.findUnique({
            where: {correo: correo}
        })
        if(existingEmail){
            return NextResponse.json({
                user: null, message: 'Ya existe un usuario con este email'}
                , {status: 409})
        }

         //Valida si el usuario existe
         const existingUser = await prisma.usrs.findUnique({
            where: {username: username}
        })
        if(existingUser){
            return NextResponse.json({
                user: null, message: 'Ya existe un usuario con este nombre'}
                , {status: 409})
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.usrs.create({
            data: {
                username,
                correo, 
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

export async function GET(){
    try {
      const users = await prisma.usrs.findMany(); // Obtener todos los usuarios de la base de datos
      return NextResponse.json(users);
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.error(error.message, { status: 500 });
      }
  };


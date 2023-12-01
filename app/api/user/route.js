import prisma from "@/app/components/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

//Schema para validacion de los input

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            RFC,
            nombre,
            username,
            password,
            edad,
            direccion,
            celular,
            telefono,
            correo,
            redSocial,
            tipoEmpleado,
            contrato,
            horario,
            estado,
            antiguedad,
        } = body;

        const existingRFC = await prisma.usrs.findUnique({
            where: { RFC: RFC },
        });
        if (existingRFC) {
            return NextResponse.json(
                {
                    user: null,
                    message: 'Ya existe un usuario con este RFC'
                },
                { status: 409 }
            );
        }

        const newUser = await prisma.usrs.create({
            data: {
                RFC,
                nombre,
                username,
                password,
                edad,
                direccion,
                celular,
                telefono,
                correo,
                redSocial,
                tipoEmpleado,
                contrato,
                horario,
                estado,
                antiguedad,
            },
        });

        return NextResponse.json(
            {
                user: newUser,
                message: 'Usuario creado correctamente',
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Algo salió mal al procesar la solicitud',
            },
            { status: 500 }
        );
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


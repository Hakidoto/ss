import prisma from "@/app/components/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET(req, {params}) {
    try {
      const id = params.id;
      const user = await prisma.usrs.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!user) {
        return NextResponse.error('Usuario no encontrado', { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.error(error.message, { status: 500 });
    }
  }
  export async function PUT(req, { params }) {
    try {
      const id = params.id;
      const { newPassword } = await req.json(); // Obteniendo la nueva contraseña desde la solicitud
  
      const hashedPassword = await hash(newPassword, 10)

      const updatedUser = await prisma.usrs.update({
        where: { id: parseInt(id) },
        data: {
          password: hashedPassword, // Actualizando la contraseña del usuario
        },
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error(error);
      return NextResponse.error(error.message, { status: 500 });
    }
  }
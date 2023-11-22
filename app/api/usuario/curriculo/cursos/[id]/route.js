// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";
import { data } from "autoprefixer";

export async function GET(req, {params}) {
  try {
    const rfc = params.rfc;
    const user = await prisma.cursos.findMany({
        where: {
          usuario: {
            rfc,
          },
        },
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
    const body = await req.json();
    
    const data = { ...body };

    console.log(data)
    const updatedUser = await prisma.cursos.upsert({
      where: { id: parseInt(id) },
      update: data,
      create: data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(data)
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    const deletedUser = await prisma.cursos.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
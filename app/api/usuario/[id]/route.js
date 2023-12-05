// pages/api/usuarios.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";

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
    //const data = {nombre: "Nuevo Nombree", direccion: "yo q se"}//Exito <---------------------
    //const data = JSON.parse(req.body); //Error <---------------------
    const body = await req.json();

    //const data = {nombre: body.nombre, direccion:body.direccion}
    const data = { ...body };

    console.log(data)
    const updatedUser = await prisma.usrs.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
// pages/api/usuarios.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
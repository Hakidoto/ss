// pages/api/usuarios/experienciaLaboral.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, {params}) {
  try {
    const rfc = params.rfc;
    const user = await prisma.experiencialaboral.findMany({
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
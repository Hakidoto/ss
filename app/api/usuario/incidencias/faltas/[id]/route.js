// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";

export async function GET(req, {params}) {
  try {
    const rfc = params.rfc;
    const user = await prisma.faltas.findMany({
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
// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";
import { data } from "autoprefixer";

export async function GET(req, {params}) {
  try {
    const errefece = params.RFC;
    //console.log(errefece)
    const user = await prisma.faltas.findMany({
        where: { RFC: errefece },
      });
    if (!user) {
      return NextResponse.error('Usuario no encontrado', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
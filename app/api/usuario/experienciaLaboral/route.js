// pages/api/usuarios.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";

export async function GET(res, req){
  try{
    const data = await prisma.experiencialaboral.findMany();
    return NextResponse.json(data)
  }catch(error){
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    
    // Aquí puedes realizar alguna validación de los datos recibidos si es necesario
    
    const newUser = await prisma.experiencialaboral.create({
      data: body,
    });

    return NextResponse.json(newUser, { status: 201 }); // Devuelve el nuevo usuario creado con el código de estado 201 (Created)
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
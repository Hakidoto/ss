// pages/api/usuarios.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(res, req){
  try{
    const data = await prisma.experiencialaboral.findMany();
    return NextResponse.json(data)
  }catch(error){
    return NextResponse.error(error.message, { status: 500 });
  }
}
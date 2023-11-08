// pages/api/usuarios.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";

export async function GET(res, req){
  try{
    const data = await prisma.lenguas.findMany();
    return NextResponse.json(data)
  }catch(error){
    return NextResponse.error(error.message, { status: 500 });
  }
}
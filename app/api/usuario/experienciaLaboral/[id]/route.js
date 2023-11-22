// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";

import prisma from "@/app/components/db";

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const body = await req.json();
    
    const data = { ...body };

    console.log(data)
    const updatedUser = await prisma.experiencialaboral.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    const deletedUser = await prisma.experiencialaboral.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const body = await req.json();
    
    const data = { ...body };

    console.log(data)
    const updatedUser = await prisma.experiencialaboral.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    const deletedUser = await prisma.experiencialaboral.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
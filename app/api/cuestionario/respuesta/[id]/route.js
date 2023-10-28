import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


export async function GET(request, { params }) {
  try {
    const question_id = params.id;

    const getAnswer = await prisma.answers.findMany({
      where: { question_id: parseInt(question_id) }, // Assuming ID is an integer
    });
    return new NextResponse(JSON.stringify(getAnswer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

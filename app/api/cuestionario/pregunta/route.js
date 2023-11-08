// surveyHandler.js
import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
    try {
      const allQuestions = await prisma.questions.findMany();
      return NextResponse.json(allQuestions);
    } catch (error) {
      console.error("Error handling GET request:", error);
      return NextResponse.error(error.message, { status: 500 });
    }
  }
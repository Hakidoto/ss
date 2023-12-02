// surveyHandler.js
import { NextResponse } from "next/server";
import prisma from "@/app/components/db";

export async function GET() {
  try {
    const latestQuestion = await prisma.questions.findFirst({
      orderBy: {
        question_id: 'desc' // 'desc' for descending order, 'asc' for ascending
      }
    });

    return NextResponse.json(latestQuestion);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
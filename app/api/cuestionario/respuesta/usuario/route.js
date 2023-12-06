import { NextResponse } from "next/server";
import prisma from "@/app/components/db";


export async function GET() {
  try {
    const allUserAnswers = await prisma.survey_responses.findMany();
    return NextResponse.json(allUserAnswers);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}


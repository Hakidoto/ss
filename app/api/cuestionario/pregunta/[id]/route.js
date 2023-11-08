import { NextResponse } from "next/server";
import prisma from "@/app/components/db";



export async function GET(request, { params }) {
  try {
    const question_id = params.id;

    const getQuestion = await prisma.questions.findMany({
      where: { survey_id: parseInt(question_id) }, // Assuming ID is an integer
    });
    return new NextResponse(JSON.stringify(getQuestion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
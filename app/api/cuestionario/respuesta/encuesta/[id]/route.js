import { NextResponse } from "next/server";
import prisma from "@/app/components/db";

//Extrae las respuestas de la tabla a partir del id de la encuesta

export async function GET(request, { params }) {
  try {
    const survey_id = params.id;

    const getUserAnswer = await prisma.survey_responses.findMany({
      where: { survey_id: parseInt(survey_id)}, // Assuming ID is an integer
    });
    return new NextResponse(JSON.stringify(getUserAnswer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
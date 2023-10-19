import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


export async function DELETE(request, { params }) {
  if (request.method !== "DELETE") {
    return NextResponse.error("Method Not Allowed", { status: 405 });
  }
  try {
    const survey_id = params.id;

    const deletedSurvey = await prisma.surveys.delete({
      where: { survey_id: parseInt(survey_id) }, // Assuming ID is an integer
    });
    return new NextResponse(JSON.stringify(deletedSurvey), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

  
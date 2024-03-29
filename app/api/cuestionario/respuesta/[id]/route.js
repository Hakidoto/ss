import { NextResponse } from "next/server";
import prisma from "@/app/components/db";


// Obtiene una o varias respuestas en base a la pregunta correspondiente
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

export async function PUT(request, { params }) {
  try {
    const answerId = params.id;

    const body = await request.json();
    const data = { ...body };

    const changeAnswer = await prisma.answers.upsert({
      where: {
        answer_id_question_id_survey_id: {
          answer_id: parseInt(answerId), question_id: parseInt(data.question_id), survey_id: parseInt(data.survey_id)
        }
      },
      update: data,
      create: data,
    });

    return new NextResponse(JSON.stringify(changeAnswer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const answer_id = params.id;
    const body = await request.json();
    const data = { ...body };

    // Assuming prisma is your database client, update this part based on your setup
    const deleteAnswer = await prisma.answers.delete({
      where: {
        answer_id_question_id_survey_id: {
          answer_id: parseInt(answer_id), question_id: parseInt(data.question_id), survey_id: parseInt(data.survey_id)
        }
      },
    });

    return new NextResponse(JSON.stringify(deleteAnswer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}


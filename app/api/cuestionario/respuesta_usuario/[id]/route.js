import { NextResponse } from "next/server";
import prisma from "@/app/components/db";

export async function GET(request, { params }) {
  try {
    const userAnswerId = params.id;

    const getUserAnswer = await prisma.survey_responses.findMany({
      where: { user_id: parseInt(userAnswerId) }, // Assuming ID is an integer
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

export async function PUT(request, { params }) {
  try {
    const userAnswerId = params.id;

    const body = await request.json();
    const data = { ...body };

    const userAnswer = await prisma.survey_responses.create({
      data: {
        user_id: parseInt(userAnswerId),
        survey_id: data.survey_id,
        answer: data.userAnswers, // Save the answerData in the 'answer' column
      }
    });

    return new NextResponse(JSON.stringify(userAnswer), {
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
    const responseId = params.id;
    const body = await request.json();
    const data = { ...body };

    // Assuming prisma is your database client, update this part based on your setup
    const deleteQuestion = await prisma.survey_responses.delete({
      where: {
        response_id: parseInt(responseId),
        user_id: parseInt(data.user_id),
        survey_id: parseInt(data.survey_id),
      },
    });

    return new NextResponse(JSON.stringify(deleteQuestion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

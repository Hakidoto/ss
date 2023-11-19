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

export async function PUT(request, { params }) {
  try {
    const question_id = params.id;

    const body = await request.json();
    const data = { ...body };

    const changeAnswer = await prisma.questions.upsert({
      where: { question_id: parseInt(question_id), survey_id: parseInt(data.survey_id) },
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

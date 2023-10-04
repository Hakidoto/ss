// surveyHandler.js
import { NextResponse } from "next/server";
import { getAllSurveys, createSurvey } from "@/app/components/example/surveyData";

export async function GET() {
  try {
    const surveys = await getAllSurveys();
    return NextResponse.json(surveys);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const json = await request.json();
    const survey = await createSurvey(json);

    return new NextResponse(JSON.stringify(survey), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

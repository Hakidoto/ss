// surveyHandler.js
import { NextResponse } from "next/server";
import prisma from "@/app/components/db";


export async function GET() {
  try {
    const allSurveys = await prisma.surveys.findMany();
    return NextResponse.json(allSurveys);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const json = await request.json();
    console.log(json);

    // Validate the incoming data
    if (!json.title || json.title.trim() === '') {
      return new NextResponse(
        JSON.stringify({ error: 'Title is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    try {
      const survey = await prisma.surveys.create({
        data: {
          title: json.title,
          description: json.description,
          estatus: json.estatus,
          // Add other fields as needed
        },
      });

      // Return the created survey
      return new NextResponse(JSON.stringify(survey), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      if (error.code === "P2002") {
        return new NextResponse(
          JSON.stringify({ error: 'Survey with the same title already exists' }),
          { status: 400, headers: { 'Content-Type': 'application/json' }});
      }
      throw error;
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

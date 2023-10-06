import { NextResponse } from "next/server";
import { deleteSurvey } from "@/app/components/example/surveyData";

export async function DELETE(request, { params }) {
  if (request.method !== "DELETE") {
    return NextResponse.error("Method Not Allowed", { status: 405 });
  }
  try {
    const survey_id = params.id;

    const deletedSurvey = await deleteSurvey(survey_id);

    return new NextResponse(JSON.stringify(deletedSurvey), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

  
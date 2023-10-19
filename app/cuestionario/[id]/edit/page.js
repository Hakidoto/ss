"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import CardPregunta from "./cardpregunta";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";


const getQuestions = cache(() =>
  fetch("/api/cuestionario/pregunta").then((res) => res.json())
);


export default function Page() {
  const [questionData, setQuestionData] = useState([]);


  return (
    <Card className="mx-auto my-auto flex-1 w-full">
      <CardHeader className="flex items-center justify-center">
        <h2 className="text-md">Edicion de encuesta</h2>
      </CardHeader>
      <CardBody>
        <CardPregunta></CardPregunta>
      </CardBody>
    </Card>
  );
}

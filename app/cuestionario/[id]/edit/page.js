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

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const data = await getQuestions();

      setQuestionData(data);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  return (
    <>
      <Card className="mx-auto my-auto flex-1 w-full">
        <CardHeader className="flex items-center justify-center">
          <h2 className="text-md">Edicion de encuesta</h2>
        </CardHeader>
        <CardBody>
          {questionData.map((question, index) => (
            <CardPregunta key={index} pregunta={question} />
          ))}
        </CardBody>
      </Card>
    </>
  );
}

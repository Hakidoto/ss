"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import CardPregunta from "./cardpregunta";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const getQuestions = (id) => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/pregunta/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    // Check for a successful response (status code 200)
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    // Parse the response as JSON
    return res.json();
  });
};

export default function Page() {
  const [questionData, setQuestionData] = useState([]);
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const data = await getQuestions(id);

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

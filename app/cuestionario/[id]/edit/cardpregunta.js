import { selectorEstatus } from "@/app/components/example/data";
import { LockIcon } from "@/app/components/icons/LockIcon";
import { MailIcon } from "@/app/components/icons/MailIcon";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";

import React, { cache, use } from "react";
import { useEffect, useState } from "react";

const getQuestions = (id) => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/respuesta/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // Check for a successful response (status code 200)
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      // Parse the response as JSON
      return res.json();
    });
};


export default function CardPregunta({ pregunta }) {
  const [answerData, setAnswerData] = useState([]);

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const data = await getQuestions(pregunta.survey_id);

      setAnswerData(data);
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
      <div class="flex items-center justify-center mb-5">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
        >
          <CardHeader className="ml-3 flex items-center justify-between">
            <div className="w-2/3">
              <Input
                className="w-full"
                label="Pregunta"
                placeholder="Ingresa el nombre de la pregunta"
                value={pregunta.question_text}
              />
            </div>
            <div className="w-1/3 ml-4 mr-3">
              <Select
                label="Tipo de pregunta"
                placeholder="Selecciona un tipo de pregunta"
              >
                {selectorEstatus.map((estatus) => (
                  <SelectItem key={estatus.value} value={estatus.value}>
                    {estatus.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardHeader>

          <CardBody>
            <Input
              autoFocus
              label="Respuesta 1"
              placeholder="Ingresa respuesta 1"
              variant="bordered"
              className=" mb-3"
            />
            <Input
              label="Respuesta 2"
              placeholder="Ingresa respuesta"
              variant="bordered"
              className=" mb-3"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}

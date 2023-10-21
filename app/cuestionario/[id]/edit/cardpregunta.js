import { selectorEstatus } from "@/app/components/example/data";
import { DeleteIcon } from "@/app/components/icons/DeleteIcon";
import { LockIcon } from "@/app/components/icons/LockIcon";
import { MailIcon } from "@/app/components/icons/MailIcon";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import {
  Button,
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
  }).then((res) => {
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

  const tipoPregunta = [
    {
      label: "Opcion Multiple",
      value: "multiple_choice",
      description:
        "La encuesta se activara en el momento que se termine la creación.",
    },
    {
      label: "Abierta",
      value: "open_text",
      description:
        "La encuesta se mantendrá inactiva cuando se termine la creación.",
    },
    {
      label: "Marcas de verificacion",
      value: "checkbox",
      description: "La encuesta se encuentra programada para una fecha futura",
    },
  ];

  const matchingType = tipoPregunta.find(
    (type) => type.value === pregunta.question_type
  );

  const spanishName = matchingType.label;

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const data = await getQuestions(pregunta.question_id);

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
        {answerData.length > 0 ? (
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
          >
            <CardHeader className=" flex items-center justify-between">
              <div className=" ml-3 w-2/3">
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
                  selectedKeys={[pregunta.question_type]}
                  placeholder="Selecciona un tipo de pregunta"
                >
                  {tipoPregunta.map((estatus) => (
                    <SelectItem key={estatus.value} value={estatus.value}>
                      {estatus.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </CardHeader>

            <CardBody>
              {answerData.map((answer, index) => (
                <>
                  <div className=" flex items-center justify-between">
                    <div className="mb-3 w-1/12">
                      <Button isIconOnly color="danger" aria-label="Like">
                        <DeleteIcon />
                      </Button>
                    </div>
                    <div className=" w-11/12">
                      <Input
                        key={index}
                        autoFocus
                        label={`Respuesta ${index + 1}`}
                        defaultValue={answer.answer_text}
                        placeholder="Ingresa respuesta 1"
                        variant="bordered"
                        className=" mb-3"
                      />
                    </div>
                  </div>
                </>
              ))}
              <Button color="primary" endContent={<PlusIcon/>}>
                Añadir pregunta  
              </Button>
            </CardBody>
          </Card>
        ) : (
          <p>No hay respuestas</p>
        )}
      </div>
    </>
  );
}

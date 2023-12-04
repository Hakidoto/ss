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
  CheckboxGroup,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import React, { cache, use } from "react";
import { useEffect, useState } from "react";

export default function CardDatosPregunta({ pregunta, respuesta}) {
  const [answerData, setAnswerData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedType, setSelectedType] = useState(pregunta.question_type); // Track the selected question type


  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas

  useEffect(() => {
    const filteredAnswers = respuesta.filter(
      (item) =>
        item.question_id === pregunta.question_id && item.survey_id === id
    );
    setAnswerData(filteredAnswers);
  }, [respuesta, pregunta.question_id]);

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

  const handleValueChange = (value) => {
    setSelectedAnswers(value);
    getAllUserAnswers(value);
  };

  const renderAnswerInput = () => {
    if (selectedType === "checkbox") {
      return (
        <div className="ml-3">
          <CheckboxGroup
            isDisabled
            label={`Selecciona una respuesta`}
            className="mb-3"
            onValueChange={handleValueChange}
            value={selectedAnswers}
          >
            {answerData.map((answer, index) => (
              <Checkbox key={answer.answer_id} value={answer.answer_id}>
                {answer.answer_text}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      );
    } else if (selectedType === "multiple_choice") {
      // Code for rendering Radio input
      return (
        <div className="ml-3">
          <RadioGroup
            isDisabled
            label={`Selecciona una respuesta`}
            className="mb-3"
            onValueChange={handleValueChange}
            value={selectedAnswers}
          >
            {answerData.map((answer, index) => (
              <Radio key={answer.answer_id} value={answer.answer_id}>
                {answer.answer_text}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      );
    } else if (selectedType === "open_text") {
      return (
        <div className="ml-3">
          <Textarea
            isDisabled
            label={`Respuesta abierta`}
            onValueChange={handleValueChange}
            placeholder={`Ingresa una respuesta...`}
            variant="bordered"
            className="mb-3"
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-5">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
        >
          <CardHeader className=" flex items-center justify-between">
            <div className=" ml-3 w-full">
              <Input
                isReadOnly
                className="w-full"
                label="Pregunta"
                placeholder="Ingresa el nombre de la pregunta"
                value={pregunta.question_text}
              />
            </div>
          </CardHeader>
          {answerData.length > 0 ? (
            <CardBody>{renderAnswerInput()}</CardBody>
          ) : (
            <CardBody className="flex items-center justify-center">
              <p className="text-md mb-3">No hay ninguna respuesta...</p>
            </CardBody>
          )}
        </Card>
      </div>
    </>
  );
}

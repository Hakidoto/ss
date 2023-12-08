import { ListboxWrapper } from "@/app/components/ListboxWrapper";
import { selectorEstatus } from "@/app/components/example/data";
import { DeleteIcon } from "@/app/components/icons/DeleteIcon";
import { LockIcon } from "@/app/components/icons/LockIcon";
import { MailIcon } from "@/app/components/icons/MailIcon";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import PieChartSurveys from "@/app/components/pieChartSurveys";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Input,
  Link,
  Listbox,
  ListboxItem,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  ScrollShadow,
  Avatar,
} from "@nextui-org/react";
import { Pie, ResponsivePie } from "@nivo/pie";
import { usePathname } from "next/navigation";

import React, { cache, use, useEffect, useMemo } from "react";
import { useState } from "react";
import { render } from "react-dom";

export default function CardDatosPregunta({
  pregunta,
  respuesta,
  userAnswers,
  getAllUserAnswers,
  allUserAnswerData,
  users,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedType, setSelectedType] = useState(pregunta.question_type); // Track the selected question type
  const [userAnswerData, setUserAnswerData] = useState({});
  const [userData, setUserData] = useState([]);

  const questionIdString = pregunta.question_id.toString();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas
  const extractedAnswers = userAnswers.map((response) => response.answer);

  const extractedNumbers = userAnswers
    .map((response) => {
      const answerKeys = Object.keys(response.answer);

      if (answerKeys.includes(questionIdString)) {
        const matchingUser = users.find((user) => user.id === response.user_id);
        return {
          question_id: pregunta.question_id,
          question_text: pregunta.question_text,
          answer: response.answer[questionIdString],
          question_type: pregunta.question_type,
          user_id: response.user_id,
          survey_id: id,
          name: matchingUser.nombre,
          response_id: response.response_id,
        };
      }
      return null; // or handle the case when the condition is not met
    })
    .filter(Boolean); // removes null values from the array

  const filteredAnswers = useMemo(() => {
    return respuesta.filter(
      (item) =>
        item.question_id === pregunta.question_id && item.survey_id === id
    );
  }, [respuesta, pregunta]);
  const [answerData, setAnswerData] = useState(filteredAnswers);

  useEffect(() => {
    getAllUserAnswers(extractedNumbers);
  }, [userAnswers]);

  const filteredArray = allUserAnswerData[questionIdString] || [];

  const answerCounts = {};

  filteredArray.forEach((response) => {
    const answer = response.answer;

    // If the answer is not yet in the answerCounts object, initialize it to 1, otherwise increment the count.
    answerCounts[answer] = (answerCounts[answer] || 0) + 1;
  });

  console.log("Answer counts:", answerCounts);

  const data = [
    {
      id: "java",
      label: "java",
      value: 427,
      color: "hsl(340, 70%, 50%)",
    },
    {
      id: "hack",
      label: "hack",
      value: 235,
      color: "hsl(293, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 319,
      color: "hsl(237, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 4,
      color: "hsl(2, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 579,
      color: "hsl(253, 70%, 50%)",
    },
  ];

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

  const renderAnswerInput = () => {
    if (pregunta.question_type === "checkbox") {
      return (
        <div className="ml-3 flex">
          <div className=" w-1/4">
            <PieChartSurveys data={data} />
          </div>
          <div className=" w-3/4">
            <CheckboxGroup
              isDisabled
              label={`Selecciona una respuesta`}
              className="mb-3"
              value={selectedAnswers}
            >
              {answerData.map((answer, index) => (
                <Checkbox key={answer.answer_id} value={answer.answer_id}>
                  {answer.answer_text}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      );
    } else if (pregunta.question_type === "multiple_choice") {
      // Code for rendering Radio input
      return (
        <div className="ml-3 flex">
          <div className=" w-1/4">
            <PieChartSurveys data={data} />
          </div>
          <div className=" w-3/4">
            <RadioGroup
              isDisabled
              label={`Selecciona una respuesta`}
              className="mb-3"
              value={selectedAnswers}
            >
              {answerData.map((answer, index) => (
                <Radio key={answer.answer_id} value={answer.answer_id}>
                  {answer.answer_text}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      );
    } else if (pregunta.question_type === "open_text") {
      return (
        <div className="ml-3 flex">
          <ListboxWrapper>
            <Listbox
              classNames={{
                base: "max-h-[200px]",
                list: " overflow-scroll",
              }}
              items={Object.values(allUserAnswerData).flat().filter(item => item.question_type === "open_text")}
              aria-label="Dynamic Actions"
            >
              {(item) => (
                <ListboxItem
                  key={item.response_id}
                  color={item.key === "delete" ? "danger" : "default"}
                  className={item.key === "delete" ? "text-danger" : ""}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={item.user_id}
                      className="flex-shrink-0"
                      size="sm"
                      src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    />
                    <div className="flex flex-col">
                      <span className="text-tiny text-default-400 ">
                        {item.name} respondió:
                      </span>
                      <span className="text-small">{item.answer}</span>
                    </div>
                  </div>
                </ListboxItem>
              )}
            </Listbox>
          </ListboxWrapper>
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
          <CardBody>{allUserAnswerData ? renderAnswerInput() : null}</CardBody>
        </Card>
      </div>
    </>
  );
}

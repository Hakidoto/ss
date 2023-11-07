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
  Textarea,
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

export default function CardPregunta({ pregunta, onRemove, newQuestionAdded, getAllQuestionsAndAnswers }) {
  const [answerData, setAnswerData] = useState([]);
  const [selectedType, setSelectedType] = useState(pregunta.question_type); // Track the selected question type

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

  const fetchData = async () => {
    try {
      // Only fetch data if the newQuestionAdded flag is false
      if (!newQuestionAdded) {
        // Assuming getSurveys returns an array of questions objects
        const data = await getQuestions(pregunta.question_id);
        setAnswerData(data);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  const renderAnswerInput = (answer, index) => {
    if (selectedType === "checkbox") {
      return (
        <Input
        key={answer.answer_id}
        autoFocus
        label={`Respuesta ${index + 1}`}
        defaultValue={answer.answer_text}
        placeholder={`Ingresa respuesta ${index + 1}`}
        variant="bordered"
        className=" mb-3"
      />
      );
    } else if (selectedType === "multiple_choice") {
      return (
        <Input
          key={answer.answer_id}
          autoFocus
          label={`Respuesta ${index + 1}`}
          defaultValue={answer.answer_text}
          placeholder={`Ingresa respuesta ${index + 1}`}
          variant="bordered"
          className=" mb-3"
        />
      );
    } else if (selectedType === "open_text") {
      return (
        <Textarea
          key={answer.answer_id}
          label={`Respuesta ${index + 1}`}
          defaultValue={answer.answer_text}
          placeholder={`Ingresa respuesta abierta ${index + 1}`}
          variant="bordered"
          className=" mb-3"
        />
      );
    }
  };

  const handleSelectorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
  };

  const handleAddResponse = () => {
    // Create a new item to add to the answerData array.

    const highestAnswerId =
    answerData.length > 0
      ? Math.max(...answerData.map((answer) => answer.answer_id))
      : 0;

    const newResponse = {
      answer_id: highestAnswerId + 1,
      question_id: pregunta.question_id,
      answer_text: "Añade una respuesta...", // You can set the default values as needed
    };

    // Create a copy of the answerData array, add the new item, and update the state.
    const updatedAnswerData = [...answerData, newResponse];
    setAnswerData(updatedAnswerData);
    getAllQuestionsAndAnswers(updatedAnswerData);
  };

  const handleDelete = (indexToDelete) => {
    const updatedAnswerData = [...answerData];
    updatedAnswerData.splice(indexToDelete, 1);
    setAnswerData(updatedAnswerData);
    getAllQuestionsAndAnswers(updatedAnswerData)
  };

  const removeAllAnswers = () => {
    // Filter out answers with the specified question_id
    const updatedAnswers = answerData.filter((answer) => answer.question_id !== pregunta.question_id);
    setAnswerData(updatedAnswers);
    getAllQuestionsAndAnswers(updatedAnswers);
  };


  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  return (
    <>
      <div className="flex items-center justify-center mb-5">
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
                defaultValue={pregunta.question_text}
              />
            </div>
            <div className="w-1/3 ml-4 mr-3">
              <Select
                label="Tipo de pregunta"
                defaultSelectedKeys={[selectedType]}
                placeholder="Selecciona un tipo de pregunta"
                onChange={(selectedValue) =>
                  handleSelectorChange(selectedValue)
                }
              >
                {tipoPregunta.map((estatus) => (
                  <SelectItem key={estatus.value} value={estatus.value}>
                    {estatus.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardHeader>
          {answerData.length > 0 ? (
            <CardBody>
              {answerData.map((answer, index) => (
                <>
                  <div className=" flex items-center justify-between">
                    <div className="mb-3 w-1/12">
                      <Button
                        isIconOnly
                        color="danger"
                        aria-label="Like"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                    <div className=" w-11/12">
                      {renderAnswerInput(answer, index)}
                    </div>
                  </div>
                </>
              ))}
              <div className="flex justify-between">
                <div className="w-1/5">
                  <Button
                    onClick={handleAddResponse}
                    className="w-full"
                    color="primary"
                    endContent={<PlusIcon />}
                  >
                    Añadir respuesta
                  </Button>
                </div>
                <div className="w-1/5">
                  <Button
                    color="danger"
                    className="w-full"
                    onClick={() => {
                      removeAllAnswers();
                      onRemove(); // Remove the question
                    }}
                    endContent={<DeleteIcon />}
                  >
                    Eliminar pregunta
                  </Button>
                </div>
              </div>
            </CardBody>
          ) : (
            <CardBody className="flex items-center justify-center">
              <p className="text-md mb-3">No hay ninguna respuesta...</p>
              <Button
                onClick={handleAddResponse}
                className="w-1/3"
                color="primary"
                endContent={<PlusIcon />}
              >
                Añadir respuesta
              </Button>
            </CardBody>
          )}
        </Card>
      </div>
    </>
  );
}

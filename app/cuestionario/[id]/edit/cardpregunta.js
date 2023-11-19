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
import { usePathname } from "next/navigation";

import React, { cache, use } from "react";
import { useEffect, useState } from "react";

export default function CardPregunta({
  pregunta,
  respuesta,
  setRespuesta,
  onRemove,
  newQuestionAdded,
  getAllQuestionsAndAnswers,
  updateQuestions
}) {
  const [answerData, setAnswerData] = useState([]);
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
    getAllQuestionsAndAnswers(filteredAnswers);
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

  const renderAnswerInput = (answer, index) => {
    if (selectedType === "checkbox") {
      return (
        <>
          <div className=" flex items-center justify-between">
            <div className="mb-3 ml-3 w-1/12">
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                isDisabled={answerData.length === 1}
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
            <div className=" w-11/12">
              <Input
                key={answer.answer_id}
                autoFocus
                label={`Respuesta ${index + 1}`}
                defaultValue={answer.answer_text}
                placeholder={`Ingresa respuesta ${index + 1}`}
                variant="bordered"
                className=" mb-3"
                onChange={(e) => updateAnswerData(index, e.target.value)}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedType === "multiple_choice") {
      return (
        <>
          <div className=" flex items-center justify-between">
            <div className="mb-3 ml-3 w-1/12">
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                isDisabled={answerData.length === 1}
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
            <div className=" w-11/12">
              <Input
                key={answer.answer_id}
                autoFocus
                label={`Respuesta ${index + 1}`}
                defaultValue={answer.answer_text}
                placeholder={`Ingresa respuesta ${index + 1}`}
                variant="bordered"
                className=" mb-3"
                onChange={(e) => updateAnswerData(index, e.target.value)}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedType === "open_text" && index === 0) {
      return (
        <>
          <div className=" flex items-center justify-between">
            <div className="mb-3 ml-3 w-1/12">
              <Button
                isIconOnly
                isDisabled={selectedType === "open_text"}
                color="danger"
                aria-label="Like"
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
            <div className=" w-11/12">
              <Textarea
                isDisabled
                key={answer.answer_id}
                label={`Respuesta abierta`}
                placeholder={`Ingresa una respuesta...`}
                variant="bordered"
                className=" mb-3"
                onChange={(e) => updateAnswerData(index, e.target.value)}
              />
            </div>
          </div>
        </>
      );
    }
  };

  const handleSelectorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    if (selectedValue !== "open_text") {
      const defaultAnswers = Array.from({ length: 4 }, (_, index) => ({
        answer_id: index,
        question_id: pregunta.question_id,
        answer_text: `Ingresa una respuesta...`,
        survey_id: id,
      }));
      setAnswerData(defaultAnswers);
      getAllQuestionsAndAnswers(answerData);
    } else {
      // Reset answerData to an array with a single element for "open_text"
      setAnswerData([
        {
          answer_id: 0,
          question_id: pregunta.question_id,
          answer_text: "Añade una respuesta...",
          survey_id: id,
        },
      ]);
      getAllQuestionsAndAnswers(answerData);
    }
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
      survey_id: id,
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
    getAllQuestionsAndAnswers(updatedAnswerData);
  };

  const updateAnswerData = (index, newText) => {
    // Create a copy of the answerData array
    const updatedAnswerData = [...answerData];

    // Update the answer_text of the specified answer at the given index
    updatedAnswerData[index] = {
      ...updatedAnswerData[index],
      answer_text: newText,
    };

    // Update the state with the new data
    setAnswerData(updatedAnswerData);
    getAllQuestionsAndAnswers(updatedAnswerData);
  };

  const handleQuestionTextChange = (event) => {
    const newQuestionText = event.target.value;

    // Call the updateQuestions function to update the question_text
    updateQuestions({
      ...pregunta,
      question_text: newQuestionText
    });
  };

  const removeAllAnswers = () => {
    // Filter out answers with the specified question_id
    const updatedAnswers = answerData.filter(
      (answer) => answer.question_id !== pregunta.question_id
    );
    setAnswerData(updatedAnswers);
    getAllQuestionsAndAnswers(updatedAnswers);
  };

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
                value={pregunta.question_text}
                onChange={handleQuestionTextChange} 
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
                <>{renderAnswerInput(answer, index)}</>
              ))}
              <div className="flex justify-between">
                <div className="ml-3 w-1/5">
                  <Button
                    onClick={handleAddResponse}
                    className="w-full"
                    color="primary"
                    endContent={<PlusIcon />}
                    isDisabled={selectedType === "open_text"}
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

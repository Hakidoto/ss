"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Tab,
  Tabs,
  CardFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import CardPregunta from "./cardpregunta";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { LuSave } from "react-icons/lu";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ShadButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { selectorEstatus } from "@/app/components/example/data";
import NextLink from "next/link";
import { ToastAction } from "@/components/ui/toast";


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

const getLastQuestion = () => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/pregunta`, {
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

const getAnswers = () => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/respuesta`, {
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

const getSurvey = cache((id) =>
  fetch(`/api/cuestionario/${id}`).then((res) => res.json())
);

export default function Page() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [questionData, setQuestionData] = useState([]);
  const [lastQuestion, setLastQuestion] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [newQuestionAdded, setNewQuestionAdded] = useState(false); // Flag to track new question
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [surveyData, setSurveyData] = useState({});
  const {toast} = useToast();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const questions = await getQuestions(id);
      const answers = await getAnswers();
      const latestQuestion = await getLastQuestion();
      const survey = await getSurvey(id);

      setAnswerData(answers);
      setQuestionData(questions);
      setLastQuestion(latestQuestion);
      setSurveyData(survey);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  const getAllQuestionsAndAnswers = (questionId, answers) => {
    setQuestionAnswers((prevQuestionAnswers) => ({
      ...prevQuestionAnswers,
      [questionId]: answers,
    }));
  };

  const saveSurveyData = async () => {
    let allRequestsSuccessful = true;

    try {
      // Extract the id from each question's question_id of the questionData usestate
      for (const question of questionData) {
        const { question_id } = question;
        const questionResponse = await fetch(
          `/api/cuestionario/pregunta/${question_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
          }
        );

        // Check if the request was successful
        if (!questionResponse.ok) {
          console.error(`Failed to save question with id ${question_id}`);
          allRequestsSuccessful = false;
          // Handle error as needed
        }
      }

      for (const question_id in questionAnswers) {
        const answers = questionAnswers[question_id];

        // Assuming answers is an array, you can loop through it
        for (const singleAnswer of answers) {
          const answerResponse = await fetch(
            `/api/cuestionario/respuesta/${singleAnswer.answer_id}`, // Use answer_id here
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(singleAnswer),
            }
          );

          // Check if the request was successful
          if (!answerResponse.ok) {
            console.error(
              `Failed to save answer for question with id ${question_id}`
            );
            allRequestsSuccessful = false;
            // Handle error as needed
          }
        }
      }

      if (allRequestsSuccessful) {
        console.log("All survey data saved successfully!");
        toast({
          title: "Guardado completado",
          description: "Los cambios se han guardado exitosamente",
          action: (
            <ToastAction asChild altText="Al menu">
              <Button
                color="primary"
                variant="solid"
                radius="md"
                size="sm"
                as={NextLink}
                href={`/cuestionario/`}
              >
                Regresar al menu
              </Button>
            </ToastAction>
          ),
        });
      } else {
        console.error(
          "Some requests failed. Survey data not saved completely."
        );
        toast({
          variant: "destructive",
          title: "Error al guardar",
          description: "Ha ocurrido un error al guardar los cambios",
          action: (
            <ToastAction asChild altText="Al menu">
              <Button
                color="primary"
                variant="solid"
                radius="md"
                size="sm"
                onClick={saveSurveyData}
              >
                Reintentar
              </Button>
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error("Error saving survey data:", error);
    }
  };

  const removeQuestion = async (indexToRemove) => {
    try {
      // Create a new array without the item to remove
      const updatedQuestions = [...questionData];
      const deletedQuestion = updatedQuestions.splice(indexToRemove, 1)[0];
      console.log(deletedQuestion);
      // Update the state with the new array
      setQuestionData(updatedQuestions);

      const response = await fetch(
        `/api/cuestionario/pregunta/${deletedQuestion.question_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify(deletedQuestion),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete question. Status: ${response.status}`
        );
      }

      // Add any additional logic after a successful deletion
    } catch (error) {
      console.error("Error handling delete question request:", error);
      // Handle error as needed
    }
  };

  const addQuestion = () => {
    // Find the highest question_id in the existing questions
    let highestQuestionId = 0;
    if (lastQuestion != null) {
      highestQuestionId = lastQuestion.question_id;
    } else {
      highestQuestionId =
        questionData.length > 0
          ? Math.max(...questionData.map((question) => question.question_id))
          : 0;
    }

    // Create a new question object
    const newQuestionObject = {
      question_id: highestQuestionId + 1,
      survey_id: id,
      question_text: "Ingresa la nueva pregunta",
      question_type: "multiple_choice",
    };

    // Create a new array with the new question appended
    const updatedQuestions = [...questionData, newQuestionObject];

    // Update the state with the new array
    setLastQuestion(newQuestionObject);
    setQuestionData(updatedQuestions);
    setNewQuestionAdded(true);
  };

  const updateQuestion = (index, newValue) => {
    // Create a new array with the updated value
    const updatedQuestion = [...questionData];
    updatedQuestion[index] = newValue;

    // Set the state with the updated array
    setQuestionData(updatedQuestion);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when the component mounts

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding field in surveyData based on the input's name
    setSurveyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Tabs color="danger" className="grid w-full grid-cols-1">
        <Tab key="Preguntas" title="Preguntas">
          <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
            <CardHeader className="flex items-center justify-center">
              <h2 className=" text-2xl ">Edicion de preguntas</h2>
            </CardHeader>
            <CardBody>
              {questionData.map((question, index) => {
                return (
                  <CardPregunta
                    key={question.question_id}
                    index={index}
                    pregunta={question}
                    questionData={questionData}
                    setPregunta={setQuestionData}
                    respuesta={answerData}
                    setRespuesta={setAnswerData}
                    onRemove={() => removeQuestion(index)}
                    removeAnswers={() => removeAnswers(index)} // Pass this function
                    newQuestionAdded={newQuestionAdded}
                    getAllQuestionsAndAnswers={(answers) =>
                      getAllQuestionsAndAnswers(question.question_id, answers)
                    }
                    updateQuestions={(questionData) =>
                      updateQuestion(index, questionData)
                    }
                  />
                );
              })}

              {questionData.length > 0 ? (
                <CardFooter>
                  <div className="flex justify-around w-full">
                    <div className="w-1/5">
                      <Button
                        className="w-full"
                        color="primary"
                        onClick={addQuestion}
                        endContent={<PlusIcon />}
                      >
                        Añadir pregunta
                      </Button>
                    </div>
                    <div className="w-1/5">
                      <Button
                        className="w-full"
                        color="success"
                        onClick={saveSurveyData}
                        endContent={<LuSave />}
                      >
                        Guardar encuesta
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              ) : (
                <CardBody className="flex items-center justify-center">
                  <p className="text-md mb-3">
                    No parece haber ninguna pregunta, añade una
                  </p>
                  <Button
                    className="w-full"
                    color="primary"
                    onClick={addQuestion}
                    endContent={<PlusIcon />}
                  >
                    Añadir pregunta
                  </Button>
                </CardBody>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Ajustes" title="Ajustes de encuesta">
          <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
            <CardHeader className="flex items-center justify-center">
              <h2 className=" text-2xl ">Ajustes de encuesta</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-center mb-5">
                <Card
                  isBlurred
                  className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
                >
                  <CardBody>
                    <div className=" ml-3 items-center justify-center mr-3 space-y-4">
                      <div className="space-y-1">
                        <Input
                          className="w-1/2"
                          label="Nombre de la encuesta"
                          name="title"
                          placeholder={surveyData?.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <Input
                          className="w-1/2"
                          label="Descripcion"
                          name="description"
                          placeholder={surveyData?.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Input
                              label="Selecciona el periodo limite de la encuesta"
                              className="w-1/2"
                              value={
                                date?.from
                                  ? date.to
                                    ? `${format(date.from, "LLL dd, y", {
                                        locale: es,
                                      })} - ${format(date.to, "LLL dd, y", {
                                        locale: es,
                                      })}`
                                    : format(date.from, "LLL dd, y", {
                                        locale: es,
                                      })
                                  : "Selecciona un rango de fechas"
                              }
                              startContent={
                                <CalendarIcon className="mr-2 h-4 w-4" />
                              }
                              id="date"
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-1">
                        <Select
                          label="Estatus de la encuesta"
                          className="w-1/2"
                          defaultSelectedKeys={[surveyData?.estatus]}
                        >
                          {selectorEstatus.map((estatus) => (
                            <SelectItem
                              key={estatus.value}
                              value={estatus.value}
                            >
                              {estatus.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}

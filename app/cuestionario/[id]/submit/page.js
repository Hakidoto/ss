"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Textarea,
} from "@nextui-org/react";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { LuSave } from "react-icons/lu";
import CardRespUsuario from "./cardRespUsuario";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import NextLink from "next/link";

const getSurvey = cache((id) =>
  fetch(`/api/cuestionario/${id}`).then((res) => res.json())
);

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

export default function Page() {
  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [survey, setSurvey] = useState({});
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const questions = await getQuestions(id);
      const answers = await getAnswers();
      const currentSurvey = await getSurvey(id);

      setAnswerData(answers);
      setQuestionData(questions);
      setSurvey(currentSurvey);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  const getAllUserAnswers = (questionId, answers) => {
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [questionId]: answers,
    }));
  };

  const saveUserAnswerData = async () => {
    let allRequestsSuccessful = true;
    const usuario_id = session.user.id;

    const userAnswersWithSurveyId = {
      userAnswers: userAnswers, // Add a new property named userAnswers
      survey_id: id, // Add the new property survey_id with the value of id
    };

    try {
      const questionResponse = await fetch(
        `/api/cuestionario/respuesta/usuario/${usuario_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userAnswersWithSurveyId),
        }
      );

      // Check if the request was successful
      if (!questionResponse.ok) {
        console.error(`Failed to save user answers for id ${usuario_id}`);
        allRequestsSuccessful = false;
        // Handle error as needed
      }

      if (allRequestsSuccessful) {
        console.log("All user answers saved successfully!");
        toast({
          title: "Guardado completado",
          description: "Respuestas guardadas exitosamente",
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
          description: "Ha ocurrido un error al guardar las respuestas",
          action: (
            <ToastAction asChild altText="Al menu">
              <Button
                color="primary"
                variant="solid"
                radius="md"
                size="sm"
                onClick={saveUserAnswerData}
              >
                Reintentar
              </Button>
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error("Error saving user answers:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when the component mounts

  return (
    <>
      <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
        <CardHeader className="flex flex-col items-center justify-center">
          <h2 className="text-2xl">{survey.title}</h2>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-5/6 mt-5"
          >
            <CardHeader className="flex justify-between">
              <Textarea
                isReadOnly
                variant="bordered"
                labelPlacement="outside"
                defaultValue={survey ? survey.description : "Cargando..."}
                label="Acerca de la encuesta"
                className="ml-3 mr-3"
              ></Textarea>
            </CardHeader>
          </Card>
        </CardHeader>

        {questionData.length > 0 ? (
          <CardBody>
            {questionData.map((question, index) => (
              <CardRespUsuario
                key={question.question_id}
                index={index}
                pregunta={question}
                respuesta={answerData}
                getAllUserAnswers={(answers) =>
                  getAllUserAnswers(question.question_id, answers)
                }
                setRespuesta={setAnswerData}
              />
            ))}

            <div className="flex justify-around">
              <div className="w-1/5"></div>
              <div className="w-1/5">
                <Button
                  className="w-full"
                  color="success"
                  endContent={<LuSave />}
                  onClick={saveUserAnswerData}
                >
                  Guardar respuestas
                </Button>
              </div>
            </div>
          </CardBody>
        ) : (
          <CardBody>
            <div className="flex items-center justify-center mb-5">
              <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
              >
                <CardHeader className=" items-center justify-center text-center">
                  No hay preguntas asignadas a esta encuesta...
                </CardHeader>
                <CardBody>
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
                </CardBody>
              </Card>
            </div>
          </CardBody>
        )}
      </Card>
    </>
  );
}

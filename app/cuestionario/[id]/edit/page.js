"use client";

import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import CardPregunta from "./cardpregunta";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { LuSave } from "react-icons/lu";

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
  const [newQuestionAdded, setNewQuestionAdded] = useState(false); // Flag to track new question
  const [questionAnswers, setQuestionAnswers] = useState({});
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of questions objects
      const questions = await getQuestions(id);
      const answers = await getAnswers();

      setAnswerData(answers);
      setQuestionData(questions);
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

  // Function to remove a question by index
  const removeQuestion = (indexToRemove) => {
    // Create a new array without the item to remove
    const updatedQuestions = questionData.filter(
      (_, index) => index !== indexToRemove
    );
    // Update the state with the new array
    setQuestionData(updatedQuestions);
  };

  const addQuestion = () => {
    console.log(questionData);
    // Find the highest question_id in the existing questions
    const highestQuestionId =
      questionData.length > 0
        ? Math.max(...questionData.map((question) => question.question_id))
        : 0;

    // Find the highest survey_id in the existing questions
    const highestSurveyId =
      questionData.length > 0
        ? Math.max(...questionData.map((question) => question.survey_id))
        : 0;

    // Create a new question object
    const newQuestionObject = {
      question_id: highestQuestionId + 1,
      survey_id: highestSurveyId,
      question_text: "Ingresa la nueva pregunta",
      question_type: "multiple_choice",
    };

    // Create a new array with the new question appended
    const updatedQuestions = [...questionData, newQuestionObject];

    // Update the state with the new array
    setQuestionData(updatedQuestions);
    setNewQuestionAdded(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    console.log(questionAnswers);
  }, [questionAnswers]);

  return (
    <>
      <Card className="mx-auto my-auto flex-1 w-full">
        <CardHeader className="flex items-center justify-center">
          <h2 className="text-md">Edicion de encuesta</h2>
        </CardHeader>
        <CardBody>
          {questionData.map((question, index) => {
            return (
              <CardPregunta
                key={question.question_id}
                index={index}
                pregunta={question}
                respuesta={answerData}
                onRemove={() => removeQuestion(index)}
                removeAnswers={() => removeAnswers(index)} // Pass this function
                newQuestionAdded={newQuestionAdded}
                getAllQuestionsAndAnswers={(answers) =>
                  getAllQuestionsAndAnswers(question.question_id, answers)
                }
              />
            );
          })}

          <div className="flex justify-around">
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
                endContent={<LuSave />}
              >
                Guardar encuesta
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

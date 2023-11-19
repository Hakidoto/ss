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
      } else {
        console.error(
          "Some requests failed. Survey data not saved completely."
        );
      }
    } catch (error) {
      console.error("Error saving survey data:", error);
    }
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

  useEffect(() => {
    console.log(questionData);
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
                setRespuesta={setAnswerData}
                onRemove={() => removeQuestion(index)}
                removeAnswers={() => removeAnswers(index)} // Pass this function
                newQuestionAdded={newQuestionAdded}
                getAllQuestionsAndAnswers={(answers) =>
                  getAllQuestionsAndAnswers(question.question_id, answers)
                }
                updateQuestions={(questionData) =>
                  updateQuestion(index, questionData)}
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
                onClick={saveSurveyData}
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

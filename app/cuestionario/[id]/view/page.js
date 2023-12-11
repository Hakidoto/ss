"use client";

import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import React, { cache, use } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { LuSave } from "react-icons/lu";
import { toast } from "react-toastify";
import CardDatosPregunta from "./cardDatosPregunta";
import { useSession } from "next-auth/react";

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

const getUserAnswer = cache((id) => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/respuesta/encuesta/${id}`, {
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
});

const getAllUsers = cache(() =>
  fetch("/api/usuario").then((res) => res.json())
);

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
  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswerData, setUserAnswerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [survey, setSurvey] = useState({});


  const { data: session, status } = useSession();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas}}

  const getAllUserAnswers = (questionId, answers) => {
    setUserAnswerData((prevUserAnswers) => ({
      ...prevUserAnswers,
      [questionId]: answers,
    }));
  };

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of survey objects
      const data = await getQuestions(id);
      const userAnswer = await getUserAnswer(id);
      const answer = await getAnswers();
      const users = await getAllUsers();
      const currentSurvey = await getSurvey(id);
      setQuestionData(data);
      setUserAnswers(userAnswer);
      setAnswerData(answer);
      setUserData(users);
      setSurvey(currentSurvey);
    } catch (error) {
      // Handle error for getUserAnswer
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    console.log(userAnswerData)
  }, [userAnswerData])
  

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when the component mounts

  return (
    <>
      <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <h2 className=" text-2xl space-y-1 ">Resultados de encuesta</h2>
          <h2 className=" text-md space-y-1">{survey.title}</h2>
        </CardHeader>
        <CardBody>
          {questionData.map((question, index) => {
            return (
              <CardDatosPregunta
                key={question.question_id}
                index={index}
                pregunta={question}
                respuesta={answerData}
                userAnswers={userAnswers}
                users={userData}
                allUserAnswerData={userAnswerData}
                getAllUserAnswers={(answers) =>
                  getAllUserAnswers(question.question_id, answers)
                }
              />
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}

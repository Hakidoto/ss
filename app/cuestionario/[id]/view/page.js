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
    return fetch(`/api/cuestionario/respuesta_usuario/${id}`, {
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
  const [userAnswers, setUserAnswers] = useState([]);
  const { data: session, status } = useSession();

  

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parseInt(parts[2], 10); // Che metodo sucio para sacar el link ajsjas
  

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of survey objects
      const data = await getQuestions(id);
      setQuestionData(data);
    } catch (error) {
      // Handle error for getSurveys
      console.error("Error fetching surveys:", error);
    }

    try {
      const userAnswer = await getUserAnswer(session.user.id);
      setUserAnswers(userAnswer);
    } catch (error) {
      // Handle error for getUserAnswer
      console.error("Error fetching user answer:", error);
    }
    try {
        const answer = await getAnswers();
        setAnswerData(answer);
      } catch (error) {
        // Handle error for getUserAnswer
        console.error("Error fetching user answer:", error);
      }
  };


  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data when the component mounts

  return (
    <>
      <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
        <CardHeader className="flex items-center justify-center">
          <h2 className="text-md">Encuesta</h2>
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
              />
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}

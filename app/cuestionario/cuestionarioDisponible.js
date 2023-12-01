import React, { cache, use } from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Link,
  Skeleton,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { MailIcon } from "../components/icons/MailIcon";
import { LockIcon } from "../components/icons/LockIcon";
import NextLink from "next/link";

const statusColorMap = {
  completada: "success",
  noCompletada: "danger",
  incompleta: "warning",
};

const getSurveys = cache(() =>
  fetch("/api/cuestionario").then((res) => res.json())
);

const getUserAnswer = cache((id) => {
  // Ensure you return the promise from fetch
  const idUsuario = "1"; //Temp, se reemplaza por la variable de sesion eventualmente
  return fetch(`/api/cuestionario/respuesta_usuario/${idUsuario}`, {
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

export default function CuestionarioDisponible() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [surveysData, setSurveysData] = useState([]);
  const [userAnswerData, setUserAnswerData] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);

  const columns = [
    { name: "TITULO", uid: "title" },
    { name: "DESCRIPCION", uid: "description" },
    { name: "FECHA", uid: "created_at" },
    { name: "ESTATUS", uid: "estatus" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of survey objects
      const data = await getSurveys();
      const userAnswer = await getUserAnswer();

      setSurveysData(data);
      setUserAnswerData(userAnswer);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData()
      .then(() => {
        setIsLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    console.log(userAnswerData);
  }, [userAnswerData]); // Fetch data when the component mounts

  const renderCell = React.useCallback((survey, columnKey) => {
    const cellValue = survey[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div>
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div>
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "estatus":
        let matchingSurvey = false;
        if (userAnswerData.survey_id === survey.survey_id) {
          matchingSurvey = true;
        }
        const status = matchingSurvey ? "completada" : "noCompletada";
        let statusText = "";
        if (status === "completada") {
          statusText = "Realizada";
        } else if (status === "noCompletada") {
          statusText = "No realizada";
        }
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[status]}
            size="sm"
            variant="flat"
          >
            {statusText}
          </Chip>
        );
      case "created_at":
        const originalDate = new Date(cellValue);
        const day = originalDate.getDate().toString().padStart(2, "0");
        const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1.
        const year = originalDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);

        return (
          <div>
            <p className="text-bold text-sm">{formattedDate}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Realizar cuestionario">
              <Button
                as={NextLink}
                href={`/cuestionario/${survey.survey_id}/submit`}
                color="primary"
                isIconOnly
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <Card className="bg-background/60 dark:bg-default-100/50">
        <CardHeader></CardHeader>
        <CardBody>
          <Skeleton isLoaded={isLoaded} className="rounded-2xl">
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={surveysData}>
                {(survey) => (
                  <TableRow key={survey.survey_id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(survey, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
}

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
import { columns, selectorEstatus } from "../components/example/data";
import { MailIcon } from "../components/icons/MailIcon";
import { LockIcon } from "../components/icons/LockIcon";

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  finalizado: "warning",
};

const getSurveys = cache(() =>
  fetch("/api/cuestionario").then((res) => res.json())
);

const getAllUserAnswer = cache(() => {
  // Ensure you return the promise from fetch
  return fetch(`/api/cuestionario/respuesta/usuario/`, {
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

export default function PanelCuestionario() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [surveysData, setSurveysData] = useState([]);
  const [userAnswerData, setUserAnswerData] = useState([]);
  const [nombreEncuesta, setNombreEncuesta] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatusEncuesta, setEstatusEncuesta] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);


  const handleCrear = async () => {
    try {
      // Prepare the data to be sent in the request body
      const data = {
        title: nombreEncuesta,
        description: descripcion,
        estatus: estatusEncuesta,
      };

      // Send a POST request to the API
      const response = await fetch("/api/cuestionario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful
      if (response.ok) {
        // Assuming the API returns the created survey data
        const createdSurvey = await response.json();

        // Add the new survey to the state
        setSurveysData((prevSurveys) => [...prevSurveys, createdSurvey]);
        console.log("Cuestionario creado exitosamente");
        onOpenChange();
      } else {
        // Handle error
        console.error("Error creating cuestionario:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteClick = React.useCallback((id) => {
    fetch(`/api/cuestionario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted survey from the state
          setSurveysData((prevSurveys) =>
            prevSurveys.filter((survey) => survey.survey_id !== id)
          );
          console.log("Eliminacion exitosa");
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error("Error deleting survey:", error);
      });
  }, []);

  const fetchData = async () => {
    try {
      // Assuming getSurveys returns an array of survey objects
      const data = await getSurveys();
      setSurveysData(data);
    } catch (error) {
      // Handle error for getSurveys
      console.error("Error fetching surveys:", error);
    }

    try {
      const userAnswer = await getAllUserAnswer();
      setUserAnswerData(userAnswer);
    } catch (error) {
      // Handle error for getUserAnswer
      console.error("Error fetching user answer:", error);
    }
  };

  useEffect(() => {
    fetchData().then(() => {
      setIsLoaded(true);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []); // Fetch data when the component mounts

  const renderCell = React.useCallback(
    (survey, columnKey) => {
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
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[survey.estatus]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'created_at':
          const originalDate = new Date(cellValue);
          const day = originalDate.getDate().toString().padStart(2, '0');
          const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1.
          const year = originalDate.getFullYear();
        
          const formattedDate = `${day}-${month}-${year}`;
        
          return (
            <div>
              <p className="text-bold text-sm">{formattedDate}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles">
              <Link
                  href={`/cuestionario/${survey.survey_id}/view`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                  </Link>
              </Tooltip>
              <Tooltip content="Editar cuestionario">
                <Link
                  href={`/cuestionario/${survey.survey_id}/edit`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar cuestionario">
                <span
                  onClick={() => handleDeleteClick(survey.survey_id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDeleteClick]
  );

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear encuesta
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nombre de la encuesta"
                  placeholder="Ingresa el nombre"
                  variant="bordered"
                  onChange={(e) => setNombreEncuesta(e.target.value)}
                />
                <Input
                  label="Descripcion"
                  placeholder="Ingresa una descripcion"
                  variant="bordered"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <Select
                  label="Estatus de la encuesta"
                  onChange={(e) => setEstatusEncuesta(e.target.value)}
                >
                  {selectorEstatus.map((estatus) => (
                    <SelectItem key={estatus.value} value={estatus.value}>
                      {estatus.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleCrear}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card className="bg-background/60 dark:bg-default-100/50">
        <CardHeader>
          <Button
            onPress={onOpenChange}
            isDisabled={!isLoaded}
            className="ml-4 mt-4"
            color="primary"
          >
            Crear encuesta
          </Button>
        </CardHeader>
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

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

export default function PanelCuestionario() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [surveysData, setSurveysData] = useState([]);
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
      console.log('oadav0');

      // Convert SQL datetime strings to "dd-mm-yyyy" format
      const formattedData = data.map((survey) => {
        const sqlDatetime = survey.created_at;
        const dateObject = new Date(sqlDatetime);

        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1;
        const year = dateObject.getUTCFullYear();

        const formattedDate = `${day < 10 ? "0" : ""}${day}-${
          month < 10 ? "0" : ""
        }${month}-${year}`;

        return { ...survey, created_at: formattedDate };
      });

      setSurveysData(formattedData);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
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
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
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

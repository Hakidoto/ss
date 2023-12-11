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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { columns, selectorEstatus } from "../components/example/data";
import { MailIcon } from "../components/icons/MailIcon";
import { LockIcon } from "../components/icons/LockIcon";
import { Calendar as CalendarIcon } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { ShadButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, formatISO } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

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
  const [survey, setSurvey] = useState({});
  const [userAnswerData, setUserAnswerData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleCrear = async () => {
    try {
      const formattedDateRange = date?.from
        ? date.to
          ? `${formatISO(date.from)} - ${formatISO(date.to)}`
          : formatISO(date.from)
        : "";

      let start_date = "";
      let end_date = "";

      if (formattedDateRange.includes(" - ")) {
        // If formattedDateRange contains a middle dash
        const [startDatePart, endDatePart] = formattedDateRange.split(" - ");
        start_date = startDatePart;
        end_date = endDatePart;
      } else {
        start_date = ""; // Use '0000-00-00' for an empty end_date
        end_date = formattedDateRange; // You can leave it empty or set it to some default value
      }

      // Prepare the data to be sent in the request body
      const data = {
        title: survey.title,
        description: survey.description,
        estatus: survey.estatus,
        start_date: start_date,
        end_date: end_date,
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
        toast({
          title: "Proceso exitoso",
          description: "Se ha creado la encuesta satisfactoriamente",
          action: (
            <ToastAction asChild altText="A edicion">
              <Button
                color="primary"
                variant="solid"
                radius="md"
                size="sm"
                as={NextLink}
                href={`/cuestionario/${createdSurvey.survey_id}/edit`}
              >
                Ir a la edicion
              </Button>
            </ToastAction>
          ),
        });
      } else {
        // Handle error
        console.error("Error creating cuestionario:", response.statusText);
        toast({
            variant: "destructive",
            title: "Error al crear cuestionario",
            description: "Ha ocurrido un error al crear el cuestionario",
            action: (
              <ToastAction asChild altText="Al menu">
                <Button
                  color="primary"
                  variant="solid"
                  radius="md"
                  size="sm"
                  onClick={handleCrear}
                >
                  Reintentar
                </Button>
              </ToastAction>
            ),
          });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding field in surveyData based on the input's name
    setSurvey((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              variant="solid"
            >
              {cellValue}
            </Chip>
          );
        case "created_at":
          const originalDate = new Date(cellValue);
          const day = originalDate.getDate().toString().padStart(2, "0");
          const month = (originalDate.getMonth() + 1)
            .toString()
            .padStart(2, "0"); // Months are zero-based, so we add 1.
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
                  name="title"
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  label="Descripcion"
                  placeholder="Ingresa una descripcion"
                  variant="bordered"
                  name="description"
                  onChange={handleInputChange}
                />
                <Popover>
                  <PopoverTrigger>
                    <Input
                      label="Selecciona el periodo limite de la encuesta"
                      name="dates"
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
                      startContent={<CalendarIcon className="mr-2 h-4 w-4" />}
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
                <Select
                  label="Estatus de la encuesta"
                  name="estatus"
                  onChange={handleInputChange}
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

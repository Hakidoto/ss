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
} from "@nextui-org/react";
import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { columns } from "../components/example/data";

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  finalizado: "warning",
};

const getSurveys = cache(() =>
  fetch("/api/cuestionario").then((res) => res.json())
);

export default function PanelCuestionario() {
  const [surveysData, setSurveysData] = useState([]);

  const handleDeleteClick = React.useCallback((id) => {
    fetch(`/api/cuestionario/delete/survey/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted survey from the state
          setSurveysData((prevSurveys) => prevSurveys.filter((survey) => survey.survey_id !== id));
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
    fetchData();
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
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
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
  );
}

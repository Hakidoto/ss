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
  fetch("http://localhost:3000/api/cuestionario").then((res) => res.json())
);

export default function PanelCuestionario() {
  const [surveysData, setSurveysData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getSurveys();
      setSurveysData(data);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

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
            <Tooltip content="Details">
              <Link
                href="#"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>
            <Tooltip content="Edit user">
              <Link
                href="#"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Link
                href="#"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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

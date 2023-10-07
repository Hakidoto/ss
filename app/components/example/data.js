import React from "react";

//borrar luego

const columns = [
  { name: "TITULO", uid: "title" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "FECHA", uid: "created_at" },
  { name: "ESTATUS", uid: "estatus" },
  { name: "ACCIONES", uid: "actions" },
];

const selectorEstatus = [
  {
    label: "Activo",
    value: "activo",
    description: "La encuesta se activara en el momento que se termine la creación.",
  },
  {
    label: "Inactivo",
    value: "inactivo",
    description: "La encuesta se mantendrá inactiva cuando se termine la creación.",
  },
  {
    label: "Programada",
    value: "programada",
    description: "La encuesta se encuentra programada para una fecha futura",
  },
];

export { columns, selectorEstatus };

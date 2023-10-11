"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import EditarCuestionario from "./editarcuestionario";

export default function Page() {
  return (
    <Card className="mx-auto my-auto flex-1 w-full">
      <CardHeader className="flex items-center justify-center">
        <h2 className="text-md">Edicion de encuesta</h2>
      </CardHeader>
      <CardBody>
        <EditarCuestionario></EditarCuestionario>
      </CardBody>
    </Card>
  );
}

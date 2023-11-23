"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import PanelCuestionario from "./panelcuestionario";

export default function Page() {
  return (
    <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
      <CardHeader className="flex items-center justify-center">
        <h2 className="text-md">Cuestionarios disponibles</h2>
      </CardHeader>
      <CardBody>
        <PanelCuestionario></PanelCuestionario>
      </CardBody>
    </Card>
  );
}

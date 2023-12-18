"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import PanelCuestionario from "./panelcuestionario";
import { Tab, Tabs } from "@nextui-org/react";
import CuestionarioDisponible from "./cuestionarioDisponible";

export default function Page() {
  return (
    <Tabs defaultSelectedKey={'creacion'} color="danger" className="grid w-full grid-cols-1" >
      <Tab key="Responder" title="Encuestas disponibles">
        <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
          <CardHeader className="flex items-center justify-center">
            <h2 className="text-md">Encuestas disponibles</h2>
          </CardHeader>
          <CardBody>
            <CuestionarioDisponible></CuestionarioDisponible>
          </CardBody>
        </Card>
      </Tab>
      <Tab key="creacion" title="Crear Encuestas">
        <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
          <CardHeader className="flex items-center justify-center">
            <h2 className="text-md">Gestion de Encuestas</h2>
          </CardHeader>
          <CardBody>
            <PanelCuestionario></PanelCuestionario>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

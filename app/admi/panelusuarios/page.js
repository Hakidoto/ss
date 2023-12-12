"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { PanelUsuario } from "./panelusuarios";
import { useRouter } from "next/navigation";

export default function Admi() {
  const router = useRouter();
  return (
    <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
      <CardHeader className="flex items-center justify-center mt-2">
        <h2>Administrar Usuarios</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <PanelUsuario></PanelUsuario>
      </CardBody>
    </Card>
  );
}

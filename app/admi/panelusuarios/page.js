"use client";

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PanelUsuario } from "./panelusuarios";
import { useRouter } from "next/navigation";

export default function Admi() {
  const router = useRouter();
  const handleEditUser = () => {
    // Lógica para editar usuario
    console.log("Editar usuario");
  };

  const handleCreateUser = () => {
    // Lógica para dar de alta usuario
    router.push("/admi/panelusuarios/signup");
    console.log("Dar de alta usuario");
  };
  return (
    <Card className="mx-auto my-auto flex-1 min-h-[80vh]">
      <CardHeader className="flex items-center justify-center">
        <h2>Administrar Usuarios</h2>
      </CardHeader>
      <CardBody>
        <div className="p-4 text-center">
          <Button auto size="large" onClick={handleEditUser} color="primary">
            Editar Usuario
          </Button>
          <Button
            auto
            size="large"
            color="primary"
            onClick={handleCreateUser}
            className="ml-4"
            
          >
            Dar de Alta
          </Button>
        </div>
        <PanelUsuario></PanelUsuario>
      </CardBody>
    </Card>
  );
}

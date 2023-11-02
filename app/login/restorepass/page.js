"use client";
import React from "react";

import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

export default function RestorePass() {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardHeader className="justify-center p-3">
          <div className="text-center">
            <h1>Recuperacion de contraseña</h1>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <div>
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Email"
                placeholder="Ingresa tu correo"
                type="username"
              />

              <div className="flex justify-end mt-5">
                <Button fullWidth color="primary">
                  Enviar codigo de Recuperacion
                </Button>
              </div>
              <div className="flex justify-end ">
                <Link size="sm" href="/login/">
                  Volver
                </Link>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

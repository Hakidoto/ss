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
      <Card className="w-[400px] h-[500px]">
        <CardHeader className="justify-center p-3">
          <div className="flex gap-4 justify-center items-center">
            <h1>Recupera tu cuenta</h1>
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
                className="mb-1"
              />

              <hr className="my-1 w-full border-gray-300" />

              <div className="flex gap-2 justify-end ">
                <Link href="/login">
                  <a>
                    <Button size="md" radius="lg" color="danger">
                      Cancelar
                    </Button>
                  </a>
                </Link>

                <Link href="/login">
                  <a>
                    <Button size="md" radius="lg" color="primary">
                      Enviar
                    </Button>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

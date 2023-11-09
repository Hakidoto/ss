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

export default function App() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] h-[500px]">
        <CardHeader className="justify-center p-3">
          <div className="flex gap-4 justify-center items-center">
            <img
              src="https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/273045404_6031937583583410_2682690734991734457_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iaFuHPPAXuIAX-T8Gmy&_nc_ht=scontent.fcjs3-1.fna&oh=00_AfBriJz3zMxN8JLwfXJL47jWH2w_L0GHrfjEsSdkA-E00Q&oe=6550713C"
              alt="Logo"
              className="w-15 h-20"
            />{" "}
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <div>
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Usuario"
                placeholder="Ingresa tu usuario"
                type="username"
              />
              <Input
                isRequired
                label="Contraseña"
                placeholder="Ingresa la contraseña"
                type="password"
              />
              <p className="text-center text-small mt-5">
                <Link size="sm" href="/login/restorepass">
                  <smal>Has olvidado tu contraseña?</smal>
                </Link>
              </p>

              <div className="flex gap-2 justify-center mb-5 ">
                <Link href="/usuario">
                  <a>
                    <Button size="lg" radius="full" color="primary">
                      Iniciar sesión
                    </Button>
                  </a>
                </Link>
              </div>
            </form>
          </div>

          <hr className="my-4 w-full border-gray-300" />

          <div className="text-center">
            <p className="text-sm">
              Copyright © 2023 Sistema de Televisión y Radio de Campeche
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

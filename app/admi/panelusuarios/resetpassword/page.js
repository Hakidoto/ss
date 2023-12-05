'use client'

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/usuario/${userId}/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {

        console.log("Contraseña actualizada correctamente");
      } else {
      
        console.error("No se pudo actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] h-[500px]">
        <CardHeader className="justify-center p-3">
          <div className="flex gap-4 justify-center items-center">
            <h1>Cambiar contraseña</h1>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                isRequired
                placeholder="Ingresa el usuario"
                type="text"
                className="mb-1"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                isRequired
                name="newPassword"
                placeholder="Nueva contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <hr className="my-1 w-full border-gray-300" />

              <div className="flex gap-2 justify-center mt-5 ">
                <div>
                  <Link href="/">
                    <Button size="lg" radius="lg" color="danger">
                      Cancelar
                    </Button>
                  </Link>
                </div>

                <div>
                  <Button type="submit" size="lg" radius="lg" color="primary">
                    Confirmar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

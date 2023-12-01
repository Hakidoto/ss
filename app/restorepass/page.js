"use client";
import React, { useState } from "react";

import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RestorePass() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    newPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/cambiar-contraseña", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        router.push("/usuario");
      } else {
        const data = await response.json();
        setError(data.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      setError("Error al cambiar la contraseña");
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] h-[500px]">
        <CardHeader className="justify-center p-3">
          <div className="flex gap-4 justify-center items-center">
            <h1>Recupera tu cuenta</h1>
          </div>
        </CardHeader>
        {error && <p>{error}</p>}
        <CardBody className="overflow-hidden">
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                isRequired
                placeholder="Ingresa tu usuario"
                type="text"
                className="mb-1"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              <Input
                isRequired
                name="newPassword"
                value={userData.newPassword}
                onChange={handleChange}
                placeholder="Nueva contraseña"
                type="password"
              />

              <hr className="my-1 w-full border-gray-300" />

             <div className="flex gap-2 justify-center mt-5 ">
             <div >
                <Link href="/login">
                  <a>
                    <Button size="lg" radius="lg" color="danger">
                      Cancelar
                    </Button>
                  </a>
                </Link>
              </div>

              <div >
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

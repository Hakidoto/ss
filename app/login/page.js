"use client";

import React from "react";
import {
  Input,
  Button,
  Image,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserIcon } from "../components/icons/UserIcon";
import { LockIcon } from "../components/icons/LockIcon";

export default function App() {
  const router = useRouter();
  const {toast} = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (response?.error) {
      // Manejo de errores
      toast({
        variant: "destructive",
        title: "Credenciales incorrectas",
        description: "Ha ocurrido un error al iniciar sesion",
      });
      console.error("Error al iniciar sesión:", response.error);
    } else if (response?.url) {
      // Redirigir a la página deseada después del inicio de sesión
      router.push("/");
      toast({
        title: "Inicio de sesion exitoso",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] relative overflow-hidden">
        <CardHeader className="justify-center">
          <div className="flex justify-center items-center">
            <Image
              className="object-cover rounded-xl"
              src="https://trccampeche.gob.mx/images/TRC_RGB_Mesa-de-trabajo-1-copia-8.png"
            />
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center">
          <div className="w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
              <Input
                isRequired
                name="username"
                autoComplete="off"
                placeholder="Ingresa tu usuario"
                type="text"
                startContent={
                  <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                isRequired
                name="password"
                autoComplete="off"
                placeholder="Ingresa la contraseña"
                type="password"
                startContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <div className="flex gap-2 justify-center my-5 ">
                <Button type="submit" size="lg" radius="full" color="primary">
                  Iniciar sesión
                </Button>
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

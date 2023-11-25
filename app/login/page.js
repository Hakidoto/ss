"use client";

import React, { useEffect, useState } from "react";
import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Oculta la notificación después de 3 segundos
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
      setError("Error en las credenciales");
      console.error("Error al iniciar sesión:", response.error);
    } else if (response?.url) {
      // Redirigir a la página deseada después del inicio de sesión
      router.push("/usuario");
      console.log(response, username);
    }
  };

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
            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
              <Input
                isRequired
                name="username"
                label="Usuario"
                placeholder="Ingresa tu usuario"
                type="username"
              />
              <Input
                isRequired
                name="password"
                label="Contraseña"
                placeholder="Ingresa la contraseña"
                type="password"
              />
              <p className="text-center text-small mt-5">
                <Link size="sm" href="/login/restorepass">
                  <small>Has olvidado tu contraseña?</small>
                </Link>
              </p>

              <div className="flex gap-2 justify-center mb-5 ">
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

      {error && (
        <div className="toast-error">
          <span className="error-text">{error}</span>
        </div>
      )}

      <style jsx>{`
        .toast-error {
          position: fixed;
          bottom: 30px;
          left: 30px;
          background-color: #ff4444;
          color: white;
          padding: 25px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.2s ease forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .error-text {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}

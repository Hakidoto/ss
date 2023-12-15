"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    RFC: "",
    nombre: "",
    username: "",
    password: "",
    edad: "",
    direccion: "",
    celular: "",
    telefono: "",
    correo: "",
    redSocial: "",
    tipoEmpleado: "",
    contrato: "",
    horario: "",
    estado: "",
    antiguedad: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        setFormData({
          RFC: "",
          nombre: "",
          nombre: "",
          username: "",
          password: "",
          edad: "",
          direccion: "",
          celular: "",
          telefono: "",
          correo: "",
          redSocial: "",
          tipoEmpleado: "",
          contrato: "",
          horario: "",
          estado: "",
          antiguedad: "",
        });
        toast({
          title: "Usuario creado exitosamente",
          description: "El usuario ha sido guardado",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error al crear usuario",
          description: "Revise los campos llenados",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fields = [
    { name: "RFC", label: "RFC", type: "text", description: "" },
    {
      name: "username",
      label: "Nombre de usuario",
      type: "text",
      description: "No se puede repetir el nombre de usuario*",
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      description: "",
    },
    // { name: "nombre", label: "Nombre", type: "text", description: "" },
    // { name: "edad", label: "Edad", type: "text", description: "" },
    // { name: "direccion", label: "Dirección", type: "text", description: "" },
    // { name: "celular", label: "Celular", type: "text", description: "" },
    // { name: "telefono", label: "Teléfono", type: "text", description: "" },
    // {
    //   name: "correo",
    //   label: "Correo electrónico",
    //   type: "email",
    //   description: "",
    // },
    // { name: "redSocial", label: "Red social", type: "text", description: "" },
    // {
    //   name: "tipoEmpleado",
    //   label: "Tipo de empleado",
    //   type: "text",
    //   description: "",
    // },
    // { name: "contrato", label: "Contrato", type: "text", description: "" },
    // { name: "horario", label: "Horario", type: "text", description: "" },
    // { name: "estado", label: "Estado", type: "text", description: "" },
    // { name: "antiguedad", label: "Antigüedad", type: "text", description: "" },
  ];

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[35%]">
        <CardHeader className="flex items-center justify-center mt-2">
          <h2>Registro de nuevos usuarios</h2>
        </CardHeader>
        <Divider />

        <CardBody className="overflow-hidden">
          <form onSubmit={onSubmit} className="grid gap-2">
          <div className="grid grid-cols-1 gap-5">
            {fields.map((field, index) => (
              <div key={index}>
                <Input
                  isRequired
                  description={field.description}
                  autoComplete="off"
                  labelPlacement={"outside"}
                  variant="underlined"
                  name={field.name}
                  label={field.label}
                  placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                  type={field.type}
                  onChange={handleInputChange}
                  value={formData[field.name]}
                />
              </div>
            ))}
          </div>
            <div className="flex gap-2 justify-center mt-5">
              <div>
                <Button type="submit" size="lg" radius="lg" color="primary">
                  Confirmar
                </Button>
              </div>
            </div>
            <div className="flex justify-center mt-2 ">
              <div>
                <Link
                  href="/admi/panelusuarios/"
                  style={{ textDecoration: "underline", color: "gray" }}
                >
                  Volver
                </Link>
              </div>
            </div>
          </form>
          <hr className="my-3 w-full border-gray-300" />
        </CardBody>
      </Card>
    </div>
  );
}

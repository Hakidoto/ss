"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();
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
        toast.success('Usuario creado correctamente')

      } else {
        toast.error('Revise los campos llenados')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fields = [
    { name: "RFC", label: "RFC", type: "text" },
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "username", label: "Nombre de usuario", type: "text" },
    { name: "password", label: "Contraseña", type: "password" },
    { name: "edad", label: "Edad", type: "text" },
    { name: "direccion", label: "Dirección", type: "text" },
    { name: "celular", label: "Celular", type: "text" },
    { name: "telefono", label: "Teléfono", type: "text" },
    { name: "correo", label: "Correo electrónico", type: "email" },
    { name: "redSocial", label: "Red social", type: "text" },
    { name: "tipoEmpleado", label: "Tipo de empleado", type: "text" },
    { name: "contrato", label: "Contrato", type: "text" },
    { name: "horario", label: "Horario", type: "text" },
    { name: "estado", label: "Estado", type: "text" },
    { name: "antiguedad", label: "Antigüedad", type: "text" },
  ];

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[100%]">
        <CardHeader className="flex items-center justify-center">
          <h2>Registro de nuevos usuarios</h2>
     
        </CardHeader>

        <CardBody className="overflow-hidden">
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-2">
            {fields.map((field, index) => (
              <div key={index}>
                <Input
                  isRequired
                  name={field.name}
                  label={field.label}
                  placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                  type={field.type}
                  onChange={handleInputChange}
                  value={formData[field.name]}
                />
              </div>
            ))}
            <div className="flex gap-2 justify-center mt-5 ">
              <div>
                <Link href="/admi/panelusuarios/">
                  <Button size="lg" radius="lg" color="danger">
                    Volver
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
          <hr className="my-3 w-full border-gray-300" />
        </CardBody>
      </Card>
    </div>
  );
}

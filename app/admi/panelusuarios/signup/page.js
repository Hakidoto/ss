"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";

import { useRouter } from "next/navigation";

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
          password: '',
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
        console.log(data);
      } else {
        console.error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fields = [
    { name: "RFC", label: "RFC", type: "text" },
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "username", label: "Nombre de usuario", type: "text" },
    { name: "password", label: "Contraseña", type: "text" },
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
          <h2>Registro de nuevo usuario</h2>
          asdas
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
            <div className="col-span-2 flex justify-center mt-3">
              <Button type="submit" size="lg" radius="full" color="primary">
                Registrar
              </Button>
            </div>
          </form>
          <hr className="my-3 w-full border-gray-300" />
        </CardBody>
      </Card>
    </div>
  );
}
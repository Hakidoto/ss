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

export default function SignUp() {

    const router = useRouter()
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const onSubmit = async (e, values) =>{
        e.preventDefault()

        try {
            const response = await fetch ('./api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(response.ok){
                const data = await response.json()
                router.push('/login')
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                  });
                console.log(data);
                
            } else{
                console.error("Error en la respuesta del servidor");
    
            }
            
        } catch (error) {
            console.error("Error:", error);
        }
       
        
    }
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
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <Input
                isRequired
                name="username"
                label="Nombre de usuario"
                placeholder="Ingresa tu nombre de usuario"
                type="text"
                onChange={handleInputChange}
                // Aquí podrías agregar un estado o useRef para manejar el valor del nombre de usuario
              />
              <Input
                isRequired
                name="email"
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
                type="email"
                onChange={handleInputChange}
                // Aquí podrías agregar un estado o useRef para manejar el valor del correo electrónico
              />
              <Input
                isRequired
                name="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                type="password"
                onChange={handleInputChange}
                // Aquí podrías agregar un estado o useRef para manejar el valor de la contraseña
              />
              <Button type="submit" size="lg" radius="full" color="primary">
                Registrarse
              </Button>
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

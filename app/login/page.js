'use client'

import React from "react";
import { Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardHeader className="justify-center p-3">
            <div className="text-center">
            <h1  >Inicio de sesion</h1>
            </div>
            

        </CardHeader>
        <CardBody className="overflow-hidden">
        <div>
              <form className="flex flex-col gap-4">
                <Input 
                  isRequired 
                  label="Usuario" 
                  placeholder="Ingresa tu usuario" 
                  type="username" />
                <Input
                  isRequired
                  label="Contraseña"
                  placeholder="Ingresa la contraseña"
                  type="password"
                />
                <p className="text-center text-small">
                  {" "}
                  <Link size="sm" href="/login/restorepass">
                  Has olvidado tu contraseña?
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Iniciar sesion
                  </Button>
                </div>
              </form>
            </div>
        </CardBody>
      </Card>
    </div>
  );
}

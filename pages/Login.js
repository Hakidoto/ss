import { Container, Card, Input, Button, Text } from "@nextui-org/react";
import Image from "next/image";
import logo from "../public/trc.png";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Card
          className="d-flex justify-content-center align-items-center"
          css={{
            mw: "370px",
          }}
        >
          <Card.Header className="d-flex align-items-center justify-content-center mt-4 flex-column">
            <Image
              src={logo}
              alt="LogoTRC"
              width="60"
              height="48"
              className="LogoTRC d-inline-block align-text-top mt-1"
            />
            <h5 className="mt-1 primaryColor">Acceso a usuarios</h5>
            
          </Card.Header>

          <Card.Body>
            <Input
              underlined
              clearable
              placeholder="Ingresa tu usuario"
              width="250px"
              color="error"
            />
            <br />
            <Input.Password
              underlined
              placeholder="Ingresa tu contraseña"
              width="250px"
              color="error"
              helperText="Campo requerido*"
            ></Input.Password>
            <br />
            <Text color="error" size={12}>
              <a onClick={() => router.push("/RecuperacionPassword")}>
                ¿Olvidaste tu contraseña?
              </a>
            </Text>
            <Button
              className="mt-4 mb-3"
              color="error"
              auto
              onClick={() => router.push("/")}
            >
              Iniciar sesión
            </Button>

          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Text size={10} b className="">
              Copyright © 2023 Sistema de Televisión y Radio de Campeche
            </Text>
            
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}

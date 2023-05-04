import { Container, Card, Input, Button, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function RecuperacionPassword() {
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
            <h5 className="mt-1 primaryColor">Recuperacion de Contraseña</h5>
          </Card.Header>

          <Card.Body>
            <Input.Password
              underlined
              clearable
              placeholder="Ingresa tu nueva contraseña"
              width="250px"
              color="error"
            />

            <Input.Password
              underlined
              placeholder="Confirma la contraseña"
              width="250px"
              color="error"
              helperText="Campo requerido*"
              className="mt-3"
            ></Input.Password>
            <br />
            <Button
              className="mt-4 mb-3"
              color="error"
              auto
              onClick={() => router.push("/Login")}
            >
              Confirmar
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

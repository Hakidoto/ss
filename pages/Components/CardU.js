import { Card, Grid, Text, Link } from "@nextui-org/react";

export default function CardU() {
  return (
    <Card css={{ 
        p: "$6",
        width: "25rem",
        position: "absolute",
        zIndex: "1",
        right: "5%"
        }}>
      <Card.Header>
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              Next UI
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>nextui.org</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Esto se puede dejar para mostrar algun dato importante, o hasta si el usr tiene alguna notificacion
        
        </Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  );
}

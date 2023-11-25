import * as React from "react";
import { Card } from "@nextui-org/card";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions)
  if(session?.user )
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
      <Card shadow style={{ padding: "30px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2em", margin: "10px 0" }}>¡Bienvenido!</h1>
        <p>Usuario: {session?.user?.username || "Invitado"}</p>
      </Card>
    </div>
  );
}

import { Table } from "@nextui-org/react";
import { Buttons } from "./Buttons";
import { Mymodal } from "./Mymodal";
import { RolesForm } from "./RolesForm";

export const TableAsignacion = () => {
  const rows = [
    {
      id: 1,
      nombre: "Juan Perez",
      contrato: 2334212,
      roles: ["Administrador", "Recursos humanos", "Usuario"],
      permisos: [
        "Crear usuarios",
        "Eliminar usuarios",
        "Crear roles",
        "Eliminar roles",
      ],
    },
  ];

  return (
    <div>
      <Table
        lined
        aria-label="Experiencia laboral"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column scope="col">#</Table.Column>
          <Table.Column scope="col">Nombre</Table.Column>
          <Table.Column scope="col">No. de contrato</Table.Column>
          <Table.Column scope="col">Roles</Table.Column>
          <Table.Column scope="col">Permisos</Table.Column>
          <Table.Column align="center" width="150px">
            OPCIONES
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {rows.map((usr) => (
            <Table.Row>
              <Table.Cell>{usr.id}</Table.Cell>
              <Table.Cell>{usr.nombre}</Table.Cell>
              <Table.Cell>{usr.contrato}</Table.Cell>
              <Table.Cell>
                {usr.roles.map((rol) => (
                  <li>{rol}</li>
                ))}
              </Table.Cell>
              <Table.Cell>
                {usr.permisos.map((perm) => (
                  <li>{perm}</li>
                ))}
              </Table.Cell>
              <Table.Cell>
                <Buttons
                  eliminar={false}
                  mas={false}
                  idModaltoCallEditar="rolesForm"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Mymodal sizeModal="xl" id="rolesForm">
        <RolesForm />
      </Mymodal>
      <style jsx>
        {`
          li {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

import { Table } from "@nextui-org/react";
import { Buttons } from "./Buttons";
import { Mymodal } from "./Mymodal";
import { RolesForm } from "./RolesForm";
import { PermUsrForm } from "./PermUsrForm";
import { RolesEmptyForm } from "./RolesEmptyForm";

export const TableRoles = () => {
  const rows = [
    {
      id: 1,
      nombreRol: "Administrador",
      descripcion: "Administra funciones criticas del sistema",
      permisos: [
        "Crear usuarios",
        "Eliminar usuarios",
        "Crear roles",
        "Eliminar roles",
      ],
      usuarios: ["Juan Perez"],
    },
    {
      id: 2,
      nombreRol: "Recursos Humanos",
      descripcion: "Descripcion para el rol de recursos humanos",
      permisos: ["Permisos 1", "Permisos 2", "Permisos 3", "Permisos 4"],
      usuarios: ["Juan Perez", "Maria Durán"],
    },
    {
      id: 3,
      nombreRol: "Usuario",
      descripcion: "Descripcion para el rol de usuario",
      permisos: ["Permisos 5", "Permisos 6", "Permisos 7", "Permisos 8"],
      usuarios: ["Juan Perez", "Maria Durán", "Juan Pancracio"],
    },
  ];

  return (
    <div>
      <button
        data-bs-toggle="modal"
        data-bs-target="#rolesFormEmpty"
        className="btn btn-secondary"
        href="/administracion/CrearUsuario"
      >
        Crear un nuevo usuario
      </button>
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
          <Table.Column scope="col">Nombre del rol</Table.Column>
          <Table.Column scope="col">Descripcion</Table.Column>
          <Table.Column scope="col">Permisos</Table.Column>
          <Table.Column scope="col">usuarios</Table.Column>
          <Table.Column align="center" width="150px">
            OPCIONES
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {rows.map((rol) => (
            <Table.Row key={rol.id}>
              <Table.Cell>{rol.id}</Table.Cell>
              <Table.Cell>{rol.nombreRol}</Table.Cell>
              <Table.Cell>
                <p className="description">{rol.descripcion}</p>
              </Table.Cell>
              <Table.Cell>
                {rol.permisos.map((permiso) => (
                  <li>{permiso}</li>
                ))}
              </Table.Cell>
              <Table.Cell>
                {rol.usuarios.map((usr) => (
                  <li>{usr}</li>
                ))}
              </Table.Cell>
              <Table.Cell>
                <Buttons mas={false} idModaltoCallEditar="rolesForm" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Mymodal title={"Administrador - Rol"} sizeModal="xl" id="rolesForm">
        <PermUsrForm />
      </Mymodal>
      <Mymodal title={"Nuevo rol"} sizeModal="lg" id="rolesFormEmpty">
        <RolesEmptyForm />
      </Mymodal>
      <style jsx>
        {`
          li {
            margin: 0;
          }

          .description {
            white-space: pre-line;
          }
        `}
      </style>
    </div>
  );
};

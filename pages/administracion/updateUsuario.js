import { Input, Table } from "@nextui-org/react";
import { Buttons } from "../Components/Buttons";
import MultiSelect from "../Components/MultiSelect";
import { Mymodal } from "../Components/Mymodal";
import { UpdateJobForm } from "../Components/UpdateJobForm";
import { AddJobForm } from "../Components/AddJobForm";

export default function ActualizarUsuario() {
  const optionsEstado = [
    { value: "activo", label: "activo" },
    { value: "Baja", label: "Baja" },
    { value: "Vacaciones", label: "Vacaciones" },
  ];

  return (
    <div className="ficha_card container">
      <h1>Datos personales</h1>
      <hr />
      <div className="d-flex gap-3 flex-wrap">
        <div className="margin_label">
          <p>Nombre:</p>
          <input className="form-control" defaultValue={"Juan Pérez"} />
        </div>
        <div className="margin_label">
          <p>Dirección:</p>
          <input
            className="form-control"
            defaultValue="Calle s/n Colonia ficticia Estado fictisio Mexico"
          ></input>
        </div>
        <div className="margin_label">
          <p>Edad</p>
          <input className="form-control" defaultValue="30"></input>
        </div>
      </div>
      <hr />
      <h4>Datos de contacto</h4>
      <div className="d-flex gap-3 flex-wrap">
        <div className="margin_label">
          <p>Numero de celular</p>
          <input className="form-control" defaultValue="7155246897"></input>
        </div>
        <div className="margin_label">
          <p>Numero de telefono</p>
          <input className="form-control" defaultValue="8181527"></input>
        </div>
        <div className="margin_label">
          <p>Correo Electronico</p>
          <input
            className="form-control"
            defaultValue="juanperez@gmail.com"
          ></input>
        </div>
        <div className="margin_label">
          <p>Alguna red social</p>
          <input className="form-control" defaultValue="(red social)"></input>
        </div>
      </div>
      <hr />
      <h4>Estatus laboral</h4>
      <div className="d-flex gap-3 flex-wrap">
        <div className="margin_label">
          <p>Tipo de empleado</p>
          <input className="form-control" defaultValue="Confianza"></input>
        </div>
        <div className="margin_label">
          <p>Contrato</p>
          <input
            className="form-control"
            defaultValue="Hasta mayo 2024"
          ></input>
        </div>
        <div className="margin_label">
          <p>Horario</p>
          <input className="form-control" defaultValue="7:00am -3:00pm"></input>
        </div>
        <div className="margin_label">
          <p>Estado</p>
          <MultiSelect
            isMulti={false}
            defaultValue={optionsEstado[0]}
            options={optionsEstado}
          />
        </div>
        <div className="margin_label">
          <p>Antiguedad</p>
          <input className="form-control" defaultValue="3.4 años"></input>
        </div>
      </div>
      <hr />
      <h2>Experiencia laboral</h2>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addJob"
        className="btn btn-success mb-3"
      >
        Agregar un empleo
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
          <Table.Column>#</Table.Column>
          <Table.Column>Nombre del empleo anterior</Table.Column>
          <Table.Column>Permanencia</Table.Column>
          <Table.Column>Jefe anterior</Table.Column>
          <Table.Column>Numero</Table.Column>
          <Table.Column width="150px">OPCIONES</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row css={{ border: "1px red solid" }} key="1">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Taquero</Table.Cell>
            <Table.Cell>2 años</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>651616</Table.Cell>
            <Table.Cell>
              <Buttons mas={false} idModaltoCallEditar="updateJob" />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="2">
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Taxista</Table.Cell>
            <Table.Cell>3 años</Table.Cell>
            <Table.Cell>Jose</Table.Cell>
            <Table.Cell>16164512</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="3">
            <Table.Cell>3</Table.Cell>
            <Table.Cell>Cajero</Table.Cell>
            <Table.Cell>2 años</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>98145178</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h2>Formacion y educación continua</h2>
      <hr />
      <h4>Cursos</h4>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addJob"
        className="btn btn-success mb-3"
      >
        Agregar un curso
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
          <Table.Column scope="col">Nombre del curso</Table.Column>
          <Table.Column scope="col">Tipo</Table.Column>
          <Table.Column scope="col">Docente</Table.Column>
          <Table.Column scope="col">Certificado(Temporal)</Table.Column>
          <Table.Column width="150px">OPCIONES</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row css={{ border: "1px red solid" }} key="1">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Offimatica</Table.Cell>
            <Table.Cell>Oficina</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>651616</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/verUsuario"
                callModalEditar={false}
                routeEditar="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="2">
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Compañerismo</Table.Cell>
            <Table.Cell>Humanidades</Table.Cell>
            <Table.Cell>Jose</Table.Cell>
            <Table.Cell>16164512</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="3">
            <Table.Cell>3</Table.Cell>
            <Table.Cell>No se</Table.Cell>
            <Table.Cell>Tampoco se</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>98145178</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <hr />
      <h4>Certificaciones</h4>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addJob"
        className="btn btn-success mb-3"
      >
        Agregar una certificacion
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
          <Table.Column scope="col">Nombre de la certificacion</Table.Column>
          <Table.Column scope="col">Tipo</Table.Column>
          <Table.Column scope="col">Docente</Table.Column>
          <Table.Column scope="col">Certificado(Temporal)</Table.Column>
          <Table.Column width="150px">OPCIONES</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row css={{ border: "1px red solid" }} key="1">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Maquinaria</Table.Cell>
            <Table.Cell>Trabajo</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>651616</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/verUsuario"
                callModalEditar={false}
                routeEditar="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="2">
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Embalaje</Table.Cell>
            <Table.Cell>Almacenamiento</Table.Cell>
            <Table.Cell>Jose</Table.Cell>
            <Table.Cell>16164512</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="3">
            <Table.Cell>3</Table.Cell>
            <Table.Cell>No se</Table.Cell>
            <Table.Cell>Tampoco se</Table.Cell>
            <Table.Cell>Rodolfo</Table.Cell>
            <Table.Cell>98145178</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <hr />
      <h4>Lenguas</h4>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addJob"
        className="btn btn-success mb-3"
      >
        Agregar una nueva lengua
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
          <Table.Column scope="col">Lengua</Table.Column>
          <Table.Column scope="col">Nivel</Table.Column>
          <Table.Column scope="col">Certificado</Table.Column>
          <Table.Column width="150px">OPCIONES</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row css={{ border: "1px red solid" }} key="1">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Ingles</Table.Cell>
            <Table.Cell>B2</Table.Cell>
            <Table.Cell>651681</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/verUsuario"
                callModalEditar={false}
                routeEditar="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="2">
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Frances</Table.Cell>
            <Table.Cell>A2</Table.Cell>
            <Table.Cell>684984</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row css={{ border: "1px red solid" }} key="3">
            <Table.Cell>3</Table.Cell>
            <Table.Cell>Aleman</Table.Cell>
            <Table.Cell>B1</Table.Cell>
            <Table.Cell>8498484684</Table.Cell>
            <Table.Cell>
              <Buttons
                mas={false}
                callModalVer={false}
                routeVer="/administracion/updateUsuario"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="container">
        <button className="btn btn-secondary btn-block mx-1" type="submit">
          Actualizar
        </button>
        <button className="btn btn-danger btn-block mx-1" type="button">
          Cancelar
        </button>
      </div>
      <Mymodal id="updateJob">
        <UpdateJobForm />
      </Mymodal>
      <Mymodal id="addJob">
        <AddJobForm />
      </Mymodal>
    </div>
  );
}

import { Buttons } from "../Components/Buttons";
import { Mymodal } from "../Components/Mymodal";
import { UpdateJobForm } from "../Components/UpdateJobForm";
import MultiSelect from "../Components/MultiSelect";
import { Table } from "@nextui-org/react";
import { AddJobForm } from "../Components/AddJobForm";

export default function Formulario() {
  return (
    <div className="ficha_card container">
      <h1>Crear un nuevo usuario</h1>
      <h3>Datos personales</h3>
      <hr />
      <div className="d-flex flex-wrap gap-3">
        <div className="margin_label">
          <p>Nombre</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Dirección</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Edad</p>
          <input type="number" className="form-control" placeholder="0"></input>
        </div>
      </div>
      <hr />
      <h4>Datos de contacto</h4>
      <div className="d-flex flex-wrap gap-3">
        <div className="margin_label">
          <p>Numero de celular</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Numero de telefono</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Correo Electronico</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Alguna red social</p>
          <input className="form-control"></input>
        </div>
      </div>
      <hr />
      <h4>Estatus laboral</h4>
      <div className="d-flex flex-wrap gap-3">
        <div className="margin_label">
          <p>Tipo de empleado</p>
          <MultiSelect
            options={[
              { value: "Confianza ", label: "Confianza" },
              { value: "Sindicalizado", label: "Sindicalizado" },
              { value: "Contrato", label: "Contrato" },
            ]}
            isMulti={false}
          />
        </div>
        <div className="margin_label">
          <p>No. Contrato</p>
          <input type="number" className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Horario</p>
          <input className="form-control"></input>
        </div>
        <div className="margin_label">
          <p>Estado</p>
          <MultiSelect
            options={[
              { value: true, label: "Activo" },
              { value: false, label: "Baja" },
              { value: "vacaciones", label: "Vacaciones" },
            ]}
            isMulti={false}
          />
        </div>
        <div className="margin_label">
          <p>Antiguedad</p>
          <input className="form-control"></input>
        </div>
      </div>
      <hr />
      <h2>Experiencia laboral</h2>
      <div className="container p-2">
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
            <Table.Column>Número</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row css={{ border: "1px red solid" }} key="1">
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Taquero</Table.Cell>
              <Table.Cell>2 años</Table.Cell>
              <Table.Cell>Luis Sanchez</Table.Cell>
              <Table.Cell>9821232343</Table.Cell>
              <Table.Cell>
                <Buttons mas={false} idModaltoCallEditar="updateJob" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <h2>Formacion y educación continua</h2>
      <hr />
      <h4>Cursos</h4>
      <div className="container p-2">
        <button type="button" className="btn btn-success mb-3">
          Agregar un curso
        </button>
      </div>
      <hr />
      <h4>Certificaciones</h4>
      <div className="container p-2">
        <button type="button" className="btn btn-success mb-3">
          Agregar un certificado
        </button>
      </div>
      <hr />
      <h4>Lenguas</h4>
      <div className="container p-2">
        <button type="button" className="btn btn-success mb-3">
          Agregar un lenguaje
        </button>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary btn-block mx-1" type="submit">
          Crear usuario
        </button>
        <button className="btn btn-secondary btn-block mx-1" type="button">
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

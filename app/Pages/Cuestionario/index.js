"use client";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Tooltip } from "@nextui-org/react";
import Modal from "./Components/Modal";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EditIcon } from "./Icons/EditIcon";
import { EyeIcon } from "./Icons/EyeIcon";
import { IconButton } from "./Icons/IconButton";

export default function Cuestionario() {
  const [modalTitle, setModalTitle] = useState("Editar Cuestionario");

  const handleButtonClick = (NuevoTitulo) => {
    setModalTitle(NuevoTitulo);
  };

  useEffect(() => setModalTitle("Editar Cuestionario"), []);

  return (
    <>
      <div className="container">
        <Button
          type="button"
          className="btn btn-primary"
          css={{ "margin-bottom": "25px" }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => handleButtonClick("Nuevo Cuestionario")}
        >
          Nuevo
        </Button>
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>AREA</TableColumn>
            <TableColumn>FECHA LIMITE</TableColumn>
            <TableColumn width="150px">OPCIONES</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow  key="1">
              <TableCell>Satisfaccion</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>24/04/23</TableCell>
              <TableCell>
                <Row justify="center" align="center">
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Ver">
                      <IconButton>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Editar">
                      <IconButton
                        data-bs-toggle="modal"
                        onClick={() => handleButtonClick("Editar Cuestionario")}
                        data-bs-target="#staticBackdrop"
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Eliminar" color="error">
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </TableCell>
            </TableRow >
            <TableRow  key="2">
              <TableCell>Satisfaccion</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>24/04/23</TableCell>
              <TableCell>
                <Row justify="center" align="center">
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Ver">
                      <IconButton>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Editar">
                      <IconButton
                        data-bs-toggle="modal"
                        onClick={() => handleButtonClick("Editar Cuestionario")}
                        data-bs-target="#staticBackdrop"
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Eliminar" color="error">
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </TableCell>
            </TableRow >
            <TableRow  key="3">
              <TableCell>Satisfaccion</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>24/04/23</TableCell>
              <TableCell>
                <Row justify="center" align="center">
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Ver">
                      <IconButton>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Editar">
                      <IconButton
                        data-bs-toggle="modal"
                        onClick={() => handleButtonClick("Editar Cuestionario")}
                        data-bs-target="#staticBackdrop"
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Eliminar" color="error">
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </TableCell>
            </TableRow >
            <TableRow  key="4">
              <TableCell>Satisfaccion</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>24/04/23</TableCell>
              <TableCell>
                <Row justify="center" align="center">
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Ver">
                      <IconButton>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Editar">
                      <IconButton
                        data-bs-toggle="modal"
                        onClick={() => handleButtonClick("Editar Cuestionario")}
                        data-bs-target="#staticBackdrop"
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Eliminar" color="error">
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </TableCell>
            </TableRow >
          </TableBody>
        </Table>
        {/*<table
          id="tablaEquipo"
          className="table table-hover table-light table-striped"
        >
          
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Area</th>
              <th scope="col">Fecha Limite</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tr>
            <td className="IdQuiz"></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  id="btnEdit"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  onClick={() => handleButtonClick("Editar Cuestionario")}
                  data-bs-target="#staticBackdrop"
                  data-id="@item.IdCuestionario"
                  data-nombre="@item.Nombre"
                  data-descripcion="@item.Descripcion"
                  data-fecha-limite="@item.FechaLimite"
                >
                  Editar
                </button>

                <button type="button" className="btn btn-danger">
                  Borrar
                </button>
              </div>
            </td>
          </tr> 
        </table>*/}
      </div>

      <Modal modalTitulo={modalTitle} />
    </>
  );
}

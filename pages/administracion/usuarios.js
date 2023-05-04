import { Buttons } from "../Components/Buttons"
import { Table } from "@nextui-org/react"
import Link from "next/link"

const Usuarios = () => {

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex gap-3">
                    <Link className="btn btn-secondary" href='/administracion/CrearUsuario'>Crear un nuevo usuario</Link>
                    <div>
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Busca un usuario"
                            aria-label="Buscar"
                        />
                    </div>
                </div>
                <Table
                    lined
                    aria-label="Usuarios del sistema"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>Nombre</Table.Column>
                        <Table.Column>Numero de contrato</Table.Column>
                        <Table.Column>Estatus</Table.Column>
                        <Table.Column>Tipo de empleado</Table.Column>
                        <Table.Column width="150px">OPCIONES</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row css={{ border: '1px red solid' }} key="1">
                            <Table.Cell>Juan Pérez</Table.Cell>
                            <Table.Cell>2139132</Table.Cell>
                            <Table.Cell>Activo</Table.Cell>
                            <Table.Cell>Confianza</Table.Cell>
                            <Table.Cell>
                                <Buttons callModalVer={false} routeVer="/administracion/verUsuario" callModalEditar={false} routeEditar="/administracion/updateUsuario" />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row css={{ border: '1px red solid' }} key="2">
                            <Table.Cell>María García</Table.Cell>
                            <Table.Cell>6234512</Table.Cell>
                            <Table.Cell>Vacaciones</Table.Cell>
                            <Table.Cell>Sindicalizado</Table.Cell>
                            <Table.Cell>
                                <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row css={{ border: '1px red solid' }} key="3">
                            <Table.Cell>Pedro González</Table.Cell>
                            <Table.Cell>6345723</Table.Cell>
                            <Table.Cell>Baja</Table.Cell>
                            <Table.Cell>Contrato</Table.Cell>
                            <Table.Cell>
                                <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

export default Usuarios
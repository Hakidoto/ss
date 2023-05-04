import { Text, Table } from "@nextui-org/react";
import { Buttons } from '../Components/Buttons'

export default function VerUsuario() {

    return (
        <div className="ficha_card container pb-3">
            <h1>Datos personales</h1>
            <hr />
            <div className="d-flex gap-3 flex-wrap">
                <div className="margin_label">
                    <p>Nombre:</p>
                    <Text className="form-control" >Juan Pérez</Text>
                </div>
                <div className="margin_label">
                    <p>Dirección:</p>
                    <Text className="form-control" >Calle s/n Colonia ficticia Estado fictisio Mexico</Text>
                </div>
                <div className="margin_label">
                    <p>Edad</p>
                    <Text className="form-control" >30</Text>
                </div>
            </div>
            <hr />
            <h4>Datos de contacto</h4>
            <div className="d-flex gap-3 flex-wrap">
                <div className="margin_label">
                    <p>Numero de celular</p>
                    <Text className="form-control" >7155246897</Text>
                </div>
                <div className="margin_label">
                    <p>Numero de telefono</p>
                    <Text className="form-control" >8181527</Text>
                </div>
                <div className="margin_label">
                    <p>Correo Electronico</p>
                    <Text className="form-control" >juanperez@gmail.com</Text>
                </div>
                <div className="margin_label">
                    <p>Alguna red social</p>
                    <Text className="form-control" >(red social)</Text>
                </div>
            </div>
            <hr />
            <h4>Estatus laboral</h4>
            <div className="d-flex gap-3 flex-wrap">
                <div className="margin_label">
                    <p>Tipo de empleado</p>
                    <Text className="form-control" >Confianza</Text>
                </div>
                <div className="margin_label">
                    <p>Contrato</p>
                    <Text className="form-control" >Hasta mayo 2024</Text>
                </div>
                <div className="margin_label">
                    <p>Horario</p>
                    <Text className="form-control" >7:00am -3:00pm</Text>
                </div>
                <div className="margin_label">
                    <p>Estado</p>
                    <Text className="form-control" >Activo</Text>
                </div>
                <div className="margin_label">
                    <p>Antiguedad</p>
                    <Text className="form-control" >3.4 años</Text>
                </div>
            </div>
            <hr />
            <h2>Experiencia laboral</h2>
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
                </Table.Header>
                <Table.Body>
                    <Table.Row css={{ border: '1px red solid' }} key="1">
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Taquero</Table.Cell>
                        <Table.Cell>2 años</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>651616</Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="2">
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>Taxista</Table.Cell>
                        <Table.Cell>3 años</Table.Cell>
                        <Table.Cell>Jose</Table.Cell>
                        <Table.Cell>16164512</Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="3">
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell>Cajero</Table.Cell>
                        <Table.Cell>2 años</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>98145178</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <h2>Formacion y educación continua</h2>
            <hr />
            <h4>Cursos</h4>
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
                    <Table.Row css={{ border: '1px red solid' }} key="1">
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Offimatica</Table.Cell>
                        <Table.Cell>Oficina</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>651616</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/verUsuario" callModalEditar={false} routeEditar="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="2">
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>Compañerismo</Table.Cell>
                        <Table.Cell>Humanidades</Table.Cell>
                        <Table.Cell>Jose</Table.Cell>
                        <Table.Cell>16164512</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="3">
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell>No se</Table.Cell>
                        <Table.Cell>Tampoco se</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>98145178</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <hr />
            <h4>Certificaciones</h4>
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
                    <Table.Row css={{ border: '1px red solid' }} key="1">
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Maquinaria</Table.Cell>
                        <Table.Cell>Trabajo</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>651616</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/verUsuario" callModalEditar={false} routeEditar="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="2">
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>Embalaje</Table.Cell>
                        <Table.Cell>Almacenamiento</Table.Cell>
                        <Table.Cell>Jose</Table.Cell>
                        <Table.Cell>16164512</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="3">
                        <Table.Cell >3</Table.Cell>
                        <Table.Cell>No se</Table.Cell>
                        <Table.Cell>Tampoco se</Table.Cell>
                        <Table.Cell>Rodolfo</Table.Cell>
                        <Table.Cell>98145178</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <hr />
            <h4>Lenguas</h4>
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
                    <Table.Row css={{ border: '1px red solid' }} key="1">
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Ingles</Table.Cell>
                        <Table.Cell>B2</Table.Cell>
                        <Table.Cell>651681</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/verUsuario" callModalEditar={false} routeEditar="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="2">
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>Frances</Table.Cell>
                        <Table.Cell>A2</Table.Cell>
                        <Table.Cell>684984</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row css={{ border: '1px red solid' }} key="3">
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell>Aleman</Table.Cell>
                        <Table.Cell>B1</Table.Cell>
                        <Table.Cell>8498484684</Table.Cell>
                        <Table.Cell>
                            <Buttons callModalVer={false} routeVer="/administracion/updateUsuario" />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};
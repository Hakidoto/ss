import React from 'react'
import { Text, Table, Link , Button, Spacer} from '@nextui-org/react'

const Certificaciones = () => {
  return (
    <div>
        <Text h4 color='error'>Certificaciones</Text>
        <hr/>
        <Table
              aria-label="Example static collection table"
              bordered
              selectionMode="single"
            >
              <Table.Header>
                <Table.Column>#</Table.Column>
                <Table.Column>Nombre de la certificacion</Table.Column>
                <Table.Column>Tipo</Table.Column>
                <Table.Column>Certificado(Temporal)</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Offimatica</Table.Cell>
                    <Table.Cell>Brindado por el organismo</Table.Cell>
                    <Table.Cell><Link>89123891</Link></Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>Compañerismo</Table.Cell>
                    <Table.Cell>Gestionado por el empleado</Table.Cell>
                    <Table.Cell><Link>89123891</Link></Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>Compañerismo</Table.Cell>
                    <Table.Cell>Brindado por el estado</Table.Cell>
                    <Table.Cell><Link>89123891</Link></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Spacer y={1}/>
            <Button>Agregar una nueva certificacion</Button>
    </div>
  )
}

export default Certificaciones
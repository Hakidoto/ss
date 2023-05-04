import React from 'react'
import { Text, Table, Link } from '@nextui-org/react'
const Incapacidades = () => {
  return (
    <div>
        <Text h4 color='error'>Incapacidad</Text>
        <hr/>
        <Table
          aria-label="Example static collection table"
          bordered
          selectionMode="single"
          headerLined
        >
          <Table.Header>
            <Table.Column>#</Table.Column>
            <Table.Column>Fecha de inicio</Table.Column>
            <Table.Column>Fecha de fin</Table.Column>
            <Table.Column>Tipo</Table.Column>
            <Table.Column>Justificante</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>15/02/2023</Table.Cell>
                <Table.Cell>17/02/2023</Table.Cell>
                <Table.Cell>Enfermedad</Table.Cell>
                <Table.Cell> <Link>5416147</Link> </Table.Cell>
            </Table.Row>
            <Table.Row key="2">
                <Table.Cell>2</Table.Cell>
                <Table.Cell>15/02/2023</Table.Cell>
                <Table.Cell>17/02/2023</Table.Cell>
                <Table.Cell>Enfermedad</Table.Cell>
                <Table.Cell><Link>5416147</Link> </Table.Cell>
            </Table.Row>
            <Table.Row key="3">
                <Table.Cell>3</Table.Cell>
                <Table.Cell>15/02/2023</Table.Cell>
                <Table.Cell>17/02/2023</Table.Cell>
                <Table.Cell>Enfermedad</Table.Cell>
                <Table.Cell><Link>5416147</Link> </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </div>
  )
}

export default Incapacidades
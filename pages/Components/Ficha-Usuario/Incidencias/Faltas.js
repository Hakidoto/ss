import React from 'react'
import { Text, Table, Spacer } from '@nextui-org/react'
const Faltas = () => {
  return (
    <div>
        <Text h4 color='error'>Faltas injustificadas</Text>
        <div style={{width:"72%"}}>
            <Table
              aria-label="Example static collection table"
              bordered
              selectionMode="single"
              headerLined
            >
              <Table.Header>
                <Table.Column>#</Table.Column>
                <Table.Column>Fecha</Table.Column>
                <Table.Column>Motivo (Opcional)</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>15/02/2023</Table.Cell>
                    <Table.Cell>Enfermedad</Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>24/03/2023</Table.Cell>
                    <Table.Cell>Cumpleaños</Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>25/04/2023</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Spacer y={1}/>
        </div>
    </div>
  )
}

export default Faltas
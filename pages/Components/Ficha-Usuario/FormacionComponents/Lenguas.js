import React from 'react'
import { Text, Table, Link, Button, Spacer } from '@nextui-org/react'

const Lenguas = () => {
  return (
    <div>
        <Text h4 color='error'>Lenguas</Text>
        <hr/>
        <Table
          aria-label="Example static collection table"
          bordered
          selectionMode="single"
          headerLined
        >
          <Table.Header>
            <Table.Column>#</Table.Column>
            <Table.Column>Lengua</Table.Column>
            <Table.Column>Nivel</Table.Column>
            <Table.Column>Certificado(Temporal)</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Ingles</Table.Cell>
                <Table.Cell>C1</Table.Cell>
                <Table.Cell><Link>89123891</Link></Table.Cell>
            </Table.Row>
            <Table.Row key="2">
                <Table.Cell>2</Table.Cell>
                <Table.Cell>Franses</Table.Cell>
                <Table.Cell>B1</Table.Cell>
                <Table.Cell><Link>89123891</Link></Table.Cell>
            </Table.Row>
            <Table.Row key="3">
                <Table.Cell>3</Table.Cell>
                <Table.Cell>Aleman</Table.Cell>
                <Table.Cell>A2</Table.Cell>
                <Table.Cell><Link>89123891</Link></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Spacer y={1}/>
        <Button>Agregar una nueva lengua</Button>
    </div>
  )
}

export default Lenguas
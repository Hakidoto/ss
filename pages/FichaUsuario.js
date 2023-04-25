import React from 'react'
import { Table, Text } from '@nextui-org/react'
import CardU from './Components/CardU'
import style from "../styles/FichaUsuario.module.css"
import PersonalData from './Components/PersonalData'
import ContactData from './Components/ContactData'
import EstatusLaboral from './Components/EstatusLaboral'

const FichaUsuario = () => {
  return (
    <div className='container'>
        <CardU/>
        <Text h2>Datos personales</Text>
        <hr />
        <PersonalData />
        <hr/>
        <ContactData />
        <hr/>
        <EstatusLaboral/>
        <hr/>
        <Text h2>Experiencia laboral</Text>
        <Table
          aria-label="Example static collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="single"
          bordered
        >
          <Table.Header>
          <Table.Column>No</Table.Column>
            <Table.Column>Nombre del empleo</Table.Column>
            <Table.Column>Permanencia</Table.Column>
            <Table.Column>Fecha inicio</Table.Column>
            <Table.Column>Fecha termino</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Taxista</Table.Cell>
              <Table.Cell>3 años</Table.Cell>
              <Table.Cell>12/03/2023</Table.Cell>
              <Table.Cell>12/03/2026</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
              <Table.Cell>Community Manager</Table.Cell>
              <Table.Cell>Vacation</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </div>
  )
}

export default FichaUsuario
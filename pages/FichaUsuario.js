import React from 'react'
import { Table, Text } from '@nextui-org/react'
import CardU from './Components/CardU'
import style from "../styles/FichaUsuario.module.css"
import PersonalData from './Components/Ficha-Usuario/PersonalData'
import ContactData from './Components/Ficha-Usuario/ContactData'
import EstatusLaboral from './Components/Ficha-Usuario/EstatusLaboral'
import ExpLaboral from './Components/Ficha-Usuario/ExpLaboral'

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
        <ExpLaboral/>
    </div>
  )
}

export default FichaUsuario
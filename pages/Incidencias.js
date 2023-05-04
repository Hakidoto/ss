import { Text, Table, Spacer, Link} from '@nextui-org/react'
import React from 'react'
import CardU from './Components/CardU';
import Faltas from './Components/Ficha-Usuario/Incidencias/Faltas';
import Incapacidades from './Components/Ficha-Usuario/Incidencias/Incapacidades';
import Procesos from './Components/Ficha-Usuario/Incidencias/Procesos';

const Incidencias = () => {
  return (
    <div className='container'>
        <CardU/>
        <Text h2>Resumen de incidencias</Text>
        <hr />
        <Faltas/>
        <Spacer y={1} />
        <Incapacidades/> 
        <Spacer y={1} />
        <Procesos/>
    </div>
  )
}

export default Incidencias
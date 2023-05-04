import React from 'react'
import CardU from './Components/CardU'
import { Text , Table, Link, Spacer} from '@nextui-org/react'
import Cursos from './Components/Ficha-Usuario/FormacionComponents/Cursos'
import Certificaciones from './Components/Ficha-Usuario/FormacionComponents/Certificaciones'
import Lenguas from './Components/Ficha-Usuario/FormacionComponents/Lenguas'

const Formacion = () => {
  return (
    <div className='container'>
        <CardU/>
        <Text h2>Formacion y educacion continua</Text>
        <hr />
        <Spacer y={1}/>
        <Cursos/>
        <Spacer y={2}/>
        <Certificaciones/>
        <Spacer y={2} />
        <Lenguas/>
    </div>
  )
}

export default Formacion
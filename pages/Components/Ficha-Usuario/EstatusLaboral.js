import React from 'react'
import { Text } from '@nextui-org/react'
import style from '../../../styles/EstatusLaboral.module.css'

const EstatusLaboral = () => {
  return (
    <div>
        <Text h2>Estatus laboral</Text>
        <div className= {`d-flex flex-wrap ${style.contactData}`}>
            <div>
                <Text h5 color='error'>Tipo de empleado</Text>
                <Text className={`form-control ${style.labelF}`} >Confianza / Sindicalizado / Contrato</Text>
            </div>
            <div>
                <Text h5 color='error'>Contrato:</Text>
                <Text className={`form-control ${style.labelF}`} >Valido hasta 25/16/2025</Text>
            </div>
            <div>
                <Text h5 color='error'>Horario:</Text>
                <Text className={`form-control ${style.labelF}`} >Lunes - Viernes 9:00am - 5:00pm</Text>
            </div>
            <div>
                <Text h5 color='error'>Estado:</Text>
                <Text className={`form-control ${style.labelF}`} >Activo / Baja / Vacaciones</Text>
            </div>
            <div>
                <Text h5 color='error'>Antiguedad:</Text>
                <Text className={`form-control ${style.labelF}`} >4.2 años</Text>
            </div>
        </div>
    </div>
  )
}

export default EstatusLaboral
import React from 'react'
import { Text } from '@nextui-org/react'
import style from '../../../styles/personalData.module.css'
//aca se debe recibir los parametros nombre direccion y edad
const PersonalData = () => {
  return (
    <div className= {`d-flex flex-wrap ${style.personalData}`}>
        <div>
            <Text h5 color='error'>Nombre:</Text>
            <Text className={`form-control ${style.labelF}`} >Juan Pancracio Apellido Si.</Text>
        </div>
        <div>
            <Text h5 color='error'>Direccion:</Text>
            <Text className={`form-control ${style.labelF}`} >Calle s/n Colonia ficticia Estado fictisio Mexico</Text>
        </div>
        <div>
            <Text h5 color='error'>Edad:</Text>
            <Text className={`form-control ${style.labelF}`} >30</Text>
        </div>
    </div>
  )
}

export default PersonalData
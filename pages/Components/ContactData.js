import React from 'react'
import { Text } from '@nextui-org/react'
import style from '../../styles/contactData.module.css'
const ContactData = () => {
  return (
    <div>
        <Text h2>Datos de contacto</Text>
        <div className= {`d-flex flex-wrap ${style.contactData}`}>
            <div>
                <Text h5 color='error'>Numero de celular</Text>
                <Text className={`form-control ${style.labelF}`} >9985351475</Text>
            </div>
            <div>
                <Text h5 color='error'>Numero de telefono:</Text>
                <Text className={`form-control ${style.labelF}`} >81815263</Text>
            </div>
            <div>
                <Text h5 color='error'>Correo electronico:</Text>
                <Text className={`form-control ${style.labelF}`} >correo.cualquiera@gmail.com</Text>
            </div>
            <div>
                <Text h5 color='error'>Red social:</Text>
                <Text className={`form-control ${style.labelF}`} >Juan Perez</Text>
            </div>
        </div>
    </div>
  )
}

export default ContactData
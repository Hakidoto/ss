import React from 'react';
import style from './style/contactData.module.css';
import CardU from './CardU';

const ContactData = () => {
  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de celular:</p>
            <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
              9811548795
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de telefono:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              81812146
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Correo electronico:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>prueba@prisma.com</p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Red social (Opcional):</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>Juan Perez</p>
          </div>
        </div>
        <hr/>
        <div className='w-1/2'>
          <CardU />
        </div>
      </div>
    </div>
  );
};

export default ContactData;

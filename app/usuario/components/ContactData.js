import React from 'react';
import style from './style/contactData.module.css';
import CardU from './CardU';
import { Skeleton } from '@nextui-org/react';

const ContactData = ({user}) => {
  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de celular:</p>
            <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
              {user ? user.celular : (<Skeleton className=' rounded-lg'>.</Skeleton>)}
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de telefono:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              {user ? user.telefono : (<Skeleton className=' rounded-lg'>.</Skeleton>)}
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Correo electronico:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>{user ? user.correo : (<Skeleton className=' rounded-lg'>.</Skeleton>)}</p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Red social (Opcional):</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>{user ? user.redSocial : (<Skeleton className=' rounded-lg'>.</Skeleton>)}</p>
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

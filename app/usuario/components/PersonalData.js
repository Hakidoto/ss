import React from 'react';
import style from './style/personalData.module.css';
import CardU from './CardU';

const PersonalData = () => {
  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Nombre:</p>
            <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
              Juan Pancracio Apellido Si.
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Direccion:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              Calle s/n Colonia ficticia Estado fictisio Mexico
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Edad:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>30</p>
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

export default PersonalData;

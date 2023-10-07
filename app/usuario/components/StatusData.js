import React from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';

const StatusData = () => {
  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div className=''>
            <p className="text-red-500 font-bold mb-2">Tipo de empleado:</p>
            <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
              Confianza / Sindicalizado / Contrato
            </p>
          </div>
          <div className=''>
            <p className="text-red-500 font-bold mb-2">Contrato:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              Valido hasta 25/16/2025
            </p>
          </div>
          <div className=''>
            <p className="text-red-500 font-bold mb-2">Horario:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>Lunes - Viernes 9:00am - 5:00pm</p>
          </div>
          <div className=''>
            <p className="text-red-500 font-bold mb-2">Estado:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
            Activo / Baja / Vacaciones
            </p>
          </div>
          <div className=''>
            <p className="text-red-500 font-bold mb-2">Antiguedad::</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>42 años</p>
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

export default StatusData;
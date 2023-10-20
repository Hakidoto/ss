import React from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';

const StatusData = ({user}) => {
  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Tipo de empleado:</p>
            <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
              {user ? user.tipoEmpleado : "Cargando.."}
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Contrato:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              {user ? user.contrato : "Cargando.."}
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Horario:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>{user ? user.horario : "Cargando.."}</p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Estado:</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
              {user ? user.estado : "Cargando.."}
            </p>
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Antiguedad::</p>
            <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>{user ? user.antiguedad : "Cargando.."}</p>
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
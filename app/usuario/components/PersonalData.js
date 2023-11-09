import React,{useState} from 'react';
import style from './style/personalData.module.css';
import CardU from './CardU';
import { Button, Skeleton } from '@nextui-org/react';

const PersonalData = ({user, isEditable, userId, fetchData, setIsEditable}) => {
  const [nombre, setNombre] = useState(user ? user.nombre : '');
  const [rfc, setRfc] = useState(user ? user.RFC : '');
  const [Direccion, setDireccion] = useState(user ? user.direccion : '');
  const [edad, setEdad] = useState(user ? user.edad : '');

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    setNombre(inputValue);
    if(nombre === "" || nombre === " "){
      setNombre(user ? user.nombre : '');
    }// NO FUNCIONO
  };
  const handleRFCChange = (e) => {
    const inputValue = e.target.value;
    setRfc(inputValue);
  };
  const handleDireccionChange = (e) => {
    const inputValue = e.target.value;
    setDireccion(inputValue);
  };
  const handleEdadChange = (e) => {
    const inputValue = e.target.value;
    setEdad(inputValue);
  };


  const handleSave = async () => {
    try {
      // Realiza una solicitud PUT a la API para actualizar el nombre
      const response = await fetch(`/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          //RFC: rfc,
          direccion: Direccion,
          edad
          // Puedes incluir otros campos que quieras actualizar aquí
        }),
      });

      if (response.ok) {
        // Actualización exitosa, puedes manejar el resultado aquí
        fetchData();
        setIsEditable(false)
        alert("Registros actualizado")
      } else {
        // Maneja errores, por ejemplo, muestra un mensaje de error
        console.log(response.error)
      }
    } catch (error) {
      // Maneja errores de red u otros
      console.log(error)
    }
  };

  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-1/2'>
          <div>
            <p className={`font-bold mb-2  ${style.rojo}`}>Nombre:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.nombre : ''}
                onChange={handleNombreChange}
                className={`rounded-md pl-3 mb-3 ${style.labelF} ${style.fadeIn}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF} ${style.fadeIn}`}>
                {user ? user.nombre : <Skeleton className='rounded-lg'>.</Skeleton>}
              </p>
            )}
          </div>
          <div>
            <p className={`font-bold mb-2  ${style.rojo}`}>RFC:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.RFC : ''}
                onChange={handleRFCChange}
                className={`rounded-md mb-3 pl-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
                {user ? user.RFC : (<Skeleton className='rounded-lg'>.</Skeleton>)}
              </p>
            )}
          </div>
          <div>
            <p className={`font-bold mb-2  ${style.rojo}`}>Direccion:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.direccion : ''}
                onChange={handleDireccionChange}
                className={`rounded-md mb-3 pl-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
                {user ? user.direccion : (<Skeleton className='rounded-lg'>.</Skeleton>)}
              </p>
            )}
          </div>
          <div>
            <p className={`font-bold mb-2  ${style.rojo}`}>Edad:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.edad : ''}
                onChange={handleEdadChange}
                className={`rounded-md mb-3 pl-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md mb-3 pl-3 ${style.labelF}`}>
                {user ? user.edad : (<Skeleton className='rounded-lg'>.</Skeleton>)}
              </p>
            )}
          </div>
          {isEditable ? (
            <Button className = {style.hov} color='success' variant="flat" onClick={()=>handleSave()}>Guardar</Button>
            ) : (
              <div></div>
          )}
        </div>
        <hr />
        <div className='w-1/2'>
          <CardU />
        </div>
      </div>
    </div>
  );
  
};

export default PersonalData;

import React,{useEffect, useState} from 'react';
import style from './style/personalData.module.css';
import CardU from './CardU';
import { Button, Skeleton } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const PersonalData = ({user, isEditable, userId, fetchData, setIsEditable}) => {
  const [nombre, setNombre] = useState(user ? user.nombre : '');
  const [rfc, setRfc] = useState(user ? user.RFC : '');
  const [Direccion, setDireccion] = useState(user ? user.direccion : '');
  const [edad, setEdad] = useState(user ? user.edad : '');
  const theme = useTheme();

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    setNombre(inputValue);
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
  
  useEffect(() => {
    if(user){
      setNombre(user.nombre)
      setRfc(user.RFC)
      setDireccion(user.direccion)
      setEdad(user.edad)
    }
  }, [user])
  

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
                value={nombre}
                onChange={handleNombreChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
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
                value={rfc}
                onChange={handleRFCChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
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
                value={Direccion}
                contentEditable
                onChange={handleDireccionChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
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
                value={edad}
                onChange={handleEdadChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
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
          <CardU user = {user}/>
        </div>
      </div>
    </div>
  );
  
};

export default PersonalData;

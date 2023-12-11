import React,{useEffect, useState} from 'react';
import style from './style/contactData.module.css';
import CardU from './CardU';
import { Skeleton, Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const ContactData = ({user, isEditable, userId, fetchData, setIsEditable}) => {
  const [celular, setCelular] = useState(user ? user.celular : '');
  const [telefono, setTelefono] = useState(user ? user.telefono : '');
  const [correo, setCorreo] = useState(user ? user.correo : '');
  const [redSocial, setRedSocial] = useState(user ? user.redSocial : '');
  const theme = useTheme();

  useEffect(() => {
    if(user){
      setCelular(user.celular)
      setTelefono(user.telefono)
      setCorreo(user.correo)
      setRedSocial(user.redSocial)
    }
  }, [user])

  const handleCelChange = (e) => {
    const inputValue = e.target.value;
    setCelular(inputValue);
  };
  const handleTelChange = (e) => {
    const inputValue = e.target.value;
    setTelefono(inputValue);
  };
  const handleCorreoChange = (e) => {
    const inputValue = e.target.value;
    setCorreo(inputValue);
  };
  const handleRSChange = (e) => {
    const inputValue = e.target.value;
    setRedSocial(inputValue);
  };

  const handleSave = async () => {
    try {
      
      const response = await fetch(`/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          celular,
          telefono,
          correo,
          redSocial
          
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
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de celular:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.celular : ''}
                value={celular}
                onChange={handleCelChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? user.celular : <Skeleton className='rounded-lg'>.</Skeleton>}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Numero de telefono:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.telefono : ''}
                value={telefono}
                onChange={handleTelChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? user.telefono : <Skeleton className='rounded-lg'>.</Skeleton>}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Correo electronico:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.correo : ''}
                value={correo}
                onChange={handleCorreoChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? user.correo : <Skeleton className='rounded-lg'>.</Skeleton>}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Red social (Opcional):</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.redSocial : ''}
                value={redSocial}
                onChange={handleRSChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? user.redSocial : <Skeleton className='rounded-lg'>.</Skeleton>}
              </p>
            )}
          </div>
          {isEditable ? (
            <Button className = {style.hov} color='success' variant="flat" onClick={()=>handleSave()}>Guardar</Button>
            ) : (
              <div></div>
          )}
        </div>
        <hr/>
        <div className='w-1/2'>
          <CardU user = {user}/>
        </div>
      </div>
    </div>
  );
};

export default ContactData;

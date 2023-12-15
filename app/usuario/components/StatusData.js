import React,{useState, useEffect} from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';
import { Skeleton, Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const StatusData = ({user, isEditable, userId, fetchData, setIsEditable}) => {
  const [tipoEmpleado, setTipoEmpleado] = useState(user ? user.tipoEmpleado : '');
  const [contrato, setContrato] = useState(user ? user.contrato : '');
  const [puesto, setPuesto] = useState(user ? user.puesto : '');
  const [horario, setHorario] = useState(user ? user.horario : '');
  const [estado, setEstado] = useState(user ? user.estado : '');
  const [antiguedad, setAntiguedad] = useState(user ? user.antiguedad : '');
  const theme = useTheme();
  const {toast} = useToast();

  useEffect(() => {
    if(user){
      setTipoEmpleado(user.tipoEmpleado)
      setPuesto(user.puesto)
      setContrato(user.contrato)
      setHorario(user.horario)
      setEstado(user.estado)
      setAntiguedad(user.antiguedad)
    }
    console.log(user)
  }, [user])

  const handleTipoEmpleadoChange = (e) => {
    const inputValue = e.target.value;
    setTipoEmpleado(inputValue);
  };
  const handleContratoChange = (e) => {
    const inputValue = e.target.value;
    setContrato(inputValue);
  };
  const handlePuestoChange = (e) => {
    const inputValue = e.target.value;
    setPuesto(inputValue);
  };
  const handleHorarioChange = (e) => {
    const inputValue = e.target.value;
    setHorario(inputValue);
  };
  const handleEstadoChange = (e) => {
    const inputValue = e.target.value;
    setEstado(inputValue);
  };
  const handleAntiguedadChange = (e) => {
    const inputValue = e.target.value;
    setAntiguedad(inputValue);
  };

  const handleSave = async () => {
    try {
      
      const response = await fetch(`/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipoEmpleado,
          puesto,
          contrato,
          horario,
          estado,
          antiguedad
          
        }),
      });

      if (response.ok) {
        // Actualización exitosa, puedes manejar el resultado aquí
        fetchData();
        setIsEditable(false)
        toast({
          title: "Guardado completado",
          description: "Los cambios se han guardado exitosamente",
        });
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
            <p className={`font-bold mb-2  ${style.rojo}`}>Tipo de empleado:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.tipoEmpleado : ''}
                value={tipoEmpleado}
                onChange={handleTipoEmpleadoChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.tipoEmpleado ? (
                    user.tipoEmpleado
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Puesto:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.puesto : ''}
                value={puesto}
                onChange={handlePuestoChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.puesto ? (
                    user.puesto
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Contrato:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.contrato : ''}
                value={contrato}
                onChange={handleContratoChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.contrato ? (
                    user.contrato
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Horario:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.horario : ''}
                value={horario}
                onChange={handleHorarioChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.horario ? (
                    user.horario
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Estado:</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.estado : ''}
                value={estado}
                onChange={handleEstadoChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.estado ? (
                    user.estado
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
              </p>
            )}
          </div>
          <div className=''>
            <p className={`font-bold mb-2  ${style.rojo}`}>Antiguedad::</p>
            {isEditable ? (
              <input
                type="text"
                placeholder={user ? user.antiguedad : ''}
                value={antiguedad}
                onChange={handleAntiguedadChange}
                className={theme.resolvedTheme == 'dark' ? `rounded-sm pl-3 mb-3 ${style.labelF}` : `rounded-sm border pl-3 mb-3 ${style.labelF}`}
              />
            ) : (
              <p className={`rounded-md pl-3 mb-3 ${style.labelF}`}>
                {user ? (
                  user.antiguedad ? (
                    user.antiguedad
                  ) : (
                    <span className="text-red-500">Sin registro</span>
                  )
                ) : (
                  <Skeleton className='rounded-lg'>.</Skeleton>
                )}
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

export default StatusData;
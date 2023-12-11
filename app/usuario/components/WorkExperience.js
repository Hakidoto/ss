import React, { useState, useEffect } from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react';
import { EditIcon } from '@/app/components/icons/EditIcon';
import { DeleteIcon } from '@/app/components/icons/DeleteIcon';

const WorkExperience = ({user, userExp, loading, fetchData, userId, userRfc }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(userExp.length / itemsPerPage);
  const [data, setData] = useState({});
  const [editingData, setEditingData] = useState({
    id: null,
    RFC: '',
    nombreEmpleo: '',
    nombreCompania: '',
    direccion: '',
    telefonoEmpleo: '',
    puestoDesempenado: '',
    sueldoPromedio: '',
    motivoSeparacion: '',
  });
  const [deletingData, setDeletingData] = useState({
    id: null,
    RFC: '',
    nombreEmpleo: '',
    nombreCompania: '',
    direccion: '',
    telefonoEmpleo: '',
    puestoDesempenado: '',
    sueldoPromedio: '',
    motivoSeparacion: '',
  });
  const [editOpen, setEditOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false) // ver si podemos usar este o otro useDisclousure

  const handleNombreEmpleoChange = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        nombreEmpleo: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      nombreEmpleo: inputValue,
    }));
  }
  const handleNombreCompañiaChange = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        nombreCompania: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      nombreCompania: inputValue,
    }));
  }
  const handleDireccionChange = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        direccion: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      direccion: inputValue,
    }));
  }
  const handleTelefonoEmpleo = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        telefonoEmpleo: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      telefonoEmpleo: inputValue,
    }));
  }
  const handlePuestoDesempenado = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        puestoDesempenado: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      puestoDesempenado: inputValue,
    }));
  }
  const handleSueldoPromedio = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        sueldoPromedio: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      sueldoPromedio: inputValue,
    }));
  }
  const handleMotivoSeparacion = (e) => {
    const inputValue = e.target.value;
    if (editOpen) {
      setEditingData((prevData) => ({
        ...prevData,
        RFC: userRfc,
        motivoSeparacion: inputValue
      }))
    }
    setData((prevData) => ({
      ...prevData,
      RFC: userRfc,
      motivoSeparacion: inputValue,
    }));
  }

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userExp.slice(startIndex, endIndex).map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.nombreEmpleo}</TableCell>
        <TableCell>{row.nombreCompania}</TableCell>
        <TableCell>{row.direccion}</TableCell>
        <TableCell>{row.telefonoEmpleo}</TableCell>
        <TableCell>{row.puestoDesempenado}</TableCell>
        <TableCell>{row.sueldoPromedio}</TableCell>
        <TableCell>{row.motivoSeparacion}</TableCell>
        <TableCell>
          <div className='flex'>
            <Button color='primary' className='mx-1' isIconOnly variant="flat" onClick={() => handleEditClick(row)}>
              <EditIcon />
            </Button>
            <Button color='danger' className='mx-1' isIconOnly variant="flat" onClick={() => handleDeleteClick(row)}>
              <DeleteIcon />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const handleEditClick = (rowData) => {
    setEditingData({
      id: rowData.id,
      nombreEmpleo: rowData.nombreEmpleo,
      nombreCompania: rowData.nombreCompania,
      direccion: rowData.direccion,
      telefonoEmpleo: rowData.telefonoEmpleo,
      puestoDesempenado: rowData.puestoDesempenado,
      sueldoPromedio: rowData.sueldoPromedio,
      motivoSeparacion: rowData.motivoSeparacion,
    });
    setEditOpen(true)
    onOpen()
  };

  const handleDeleteClick = (rowData) => {
    setDeletingData({
      id: rowData.id,
      nombreEmpleo: rowData.nombreEmpleo,
      nombreCompania: rowData.nombreCompania,
      direccion: rowData.direccion,
      telefonoEmpleo: rowData.telefonoEmpleo,
      puestoDesempenado: rowData.puestoDesempenado,
      sueldoPromedio: rowData.sueldoPromedio,
      motivoSeparacion: rowData.motivoSeparacion,
    });
    setIsOpenDelete(true)
    //onOpen()
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/usuario/experienciaLaboral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        renderTableRows();
        fetchData();
        setCurrentPage(page)
        onClose();
      } else {
        console.log("Hubo un error al conectar con el api")
      }
    } catch (error) {
      console.log("Hubo un error al conectar con el api: ", error)
    }

  }

  //Realizar fetch al endpoint PUT
  const handleEditSave = async () => {
    try {
      const response = await fetch(`/api/usuario/experienciaLaboral/${editingData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingData),
      });

      if (response.ok) {
        //const responseData = await response.json();
        renderTableRows();
        fetchData();
        onClose();
      } else {
        console.log("Hubo un error al conectar con el api")
      }
    } catch (error) {
      console.log("Hubo un error al conectar con el api: ", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/usuario/experienciaLaboral/${deletingData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletingData),
      });

      if (response.ok) {
        //const responseData = await response.json();
        renderTableRows();
        fetchData();
        setIsOpenDelete(false)
        alert("Registro eliminado")
      } else {
        console.log("Hubo un error al conectar con el api")
      }
    } catch (error) {
      console.log("Hubo un error al conectar con el api: ", error)
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  


  return (
    <div className={`${style.personalData}`}>
      <div className={`flex justify-between h-full ${style.prueba}`}>
        <div className='w-3/4'>
          <div className='mr-2'>
            <Table
              aria-label="Example static collection table"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="single"
              bordered
            >
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Nombre del empleo</TableColumn>
                <TableColumn>Nombre de la compañia</TableColumn>
                <TableColumn>Direccion</TableColumn>
                <TableColumn>Telefono de contacto</TableColumn>
                <TableColumn>Puesto desempeñado</TableColumn>
                <TableColumn>Sueldo promedio</TableColumn>
                <TableColumn>Motivo de separacion</TableColumn>
                <TableColumn>Herramientas</TableColumn>
              </TableHeader>
              {loading ? (
                <TableBody>
                  {Array(5).fill().map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className=' rounded-lg' >.</Skeleton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {renderTableRows()}
                </TableBody>
              )
              }
            </Table>
            <Spacer y={3} />
            <div className='flex'>
              <Pagination
                total={totalPages}
                color="secondary"
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
              />
              <Button className='mx-1' onPress={onOpen} color='danger' variant='bordered'>Añadir un registro</Button>
            </div>
          </div>
        </div>
        <hr />
        <div className='w-1/4'>
          <CardU user = {user}/>
        </div>
        <Modal
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            }
          }}
          backdrop='blur'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{editOpen ? "Editar el registro seleccionado" : "Agregar un registro nuevo"}</ModalHeader>
                {editOpen ? (
                  <ModalBody>
                    <Input
                      onChange={handleNombreEmpleoChange}
                      autoFocus
                      label="Nombre del empleo"
                      placeholder={editingData.nombreEmpleo}
                      value={editingData.nombreEmpleo}
                      variant="bordered"
                    />
                    <Input
                      onChange={handleNombreCompañiaChange}
                      autoFocus
                      label="Nombre de la compañia"
                      placeholder={editingData.nombreCompania}
                      value={editingData.nombreCompania}
                      variant="bordered"
                    />
                    <Input
                      onChange={handleDireccionChange}
                      autoFocus
                      label="Direccion de la compañia"
                      placeholder={editingData.direccion}
                      value={editingData.direccion}
                      variant="bordered"
                    />
                    <Input
                      onChange={handleTelefonoEmpleo}
                      autoFocus
                      label="Telefono de contacto de la compañia"
                      placeholder={editingData.telefonoEmpleo}
                      value={editingData.telefonoEmpleo}
                      variant="bordered"
                    />
                    <Input
                      onChange={handlePuestoDesempenado}
                      autoFocus
                      label="Puesto desempeñado"
                      placeholder={editingData.puestoDesempenado}
                      value={editingData.puestoDesempenado}
                      variant="bordered"
                    />
                    <Input
                      onChange={handleSueldoPromedio}
                      autoFocus
                      label="Sueldo promedio"
                      placeholder={editingData.sueldoPromedio}
                      value={editingData.sueldoPromedio}
                      variant="bordered"
                    />
                    <Input
                      onChange={handleMotivoSeparacion}
                      autoFocus
                      label="Motivo de separacion"
                      placeholder={editingData.motivoSeparacion}
                      value={editingData.motivoSeparacion}
                      variant="bordered"
                    />
                    <div className="flex py-1 px-1 justify-between">
                      <Link color="primary" href="#" size="sm">
                        Tus datos se manejan en extrema confidencialidad
                      </Link>
                    </div>
                  </ModalBody>
                ) :
                  (
                    <ModalBody>
                      <Input
                        onChange={handleNombreEmpleoChange}
                        autoFocus
                        label="Nombre del empleo"
                        placeholder="¡Escribe aqui de que fungias!"
                        variant="bordered"
                      />
                      <Input
                        onChange={handleNombreCompañiaChange}
                        label="Nombre de la compañia"
                        placeholder="Aqui va el nombre de la compañia"
                        variant="bordered"
                      />
                      <Input
                        onChange={handleDireccionChange}
                        autoFocus
                        label="Direccion"
                        placeholder="¡Escribe aqui la direccion!"
                        variant="bordered"
                      />
                      <Input
                        onChange={handleTelefonoEmpleo}
                        label="Telefono de la compañia"
                        placeholder="Medio de contacto"
                        variant="bordered"
                      />
                      <Input
                        onChange={handlePuestoDesempenado}
                        autoFocus
                        label="Funcion desempeñada"
                        placeholder="Por ejemplo, en que puesto estabas"
                        variant="bordered"
                      />
                      <Input
                        onChange={handleSueldoPromedio}
                        label="Sueldo promedio"
                        placeholder="Sueldo promedio mensual de 3 meses"
                        variant="bordered"
                      />
                      <Input
                        onChange={handleMotivoSeparacion}
                        label="Motivo de separacion"
                        placeholder="¿Por que dejaste de trabajar en esa compañia?"
                        variant="bordered"
                      />
                      <div className="flex py-1 px-1 justify-between">
                        <Link color="primary" href="#" size="sm">
                          Tus datos se manejan en extrema confidencialidad
                        </Link>
                      </div>
                    </ModalBody>
                  )}
                <ModalFooter>

                  <Button color="danger" variant="flat" onPress={onClose} onClick={() => setEditOpen(false)}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={editOpen ? handleEditSave : handleSave}  >
                    {editOpen ? "¡¡Editar registro!!" : "¡Registro nuevo!"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {isOpenDelete ? (
          <Modal
            backdrop='blur'
            isOpen={isOpenDelete}
            placement="top-center"
          >
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">Eliminar registro de manera permanente</ModalHeader>
                <ModalBody>
                  <Input
                    isReadOnly
                    label="Nombre del empleo"
                    placeholder={deletingData.nombreEmpleo}
                    value={deletingData.nombreEmpleo}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Nombre de la compañia"
                    placeholder={deletingData.nombreCompania}
                    value={deletingData.nombreCompania}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Direccion de la compañia"
                    placeholder={deletingData.direccion}
                    value={deletingData.direccion}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Telefono de contacto de la compañia"
                    placeholder={deletingData.telefonoEmpleo}
                    value={deletingData.telefonoEmpleo}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Puesto desempeñado"
                    placeholder={deletingData.puestoDesempenado}
                    value={deletingData.puestoDesempenado}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Sueldo promedio"
                    placeholder={deletingData.sueldoPromedio}
                    value={deletingData.sueldoPromedio}
                    variant="bordered"
                  />
                  <Input
                    isReadOnly
                    label="Motivo de separacion"
                    placeholder={deletingData.motivoSeparacion}
                    value={deletingData.motivoSeparacion}
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>

                  <Button color="success" variant="flat" onClick={() => setIsOpenDelete(false)}>
                    Cancelar
                  </Button>
                  <Button color="danger" onClick={handleDelete}  >
                    ¿Estas seguro de eliminar el registro?
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        )
          :
          (
            <div>
            </div>
          )}
      </div>
    </div>
  );
};

export default WorkExperience;

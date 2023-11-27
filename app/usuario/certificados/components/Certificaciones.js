import React, {useState, useEffect, useRef} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link} from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';
import { EditIcon } from '@/app/components/icons/EditIcon';
import { DeleteIcon } from '@/app/components/icons/DeleteIcon';

const Certificaciones = ({certificacion , isLoaded, fetchData, rfcUsuario}) => {
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [editingData, setEditingData] = useState({
      id: null,
      nombreCertificado: '',
      tipoCertificado: '',
      certificado: null
    });
    const [deletingData, setDeletingData] = useState({
      id: null,
      nombreCertificado: '',
      tipoCertificado: '',
      certificado: null
    });
    const [data, setData] = useState({});
    const fileInputRef = useRef(null);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(certificacion.length / itemsPerPage);
    
    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return certificacion.slice(startIndex, endIndex).map((row, index) => (
            <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombreCertificado}</TableCell>
                <TableCell>{row.tipoCertificado}</TableCell>
                <TableCell>Pendiente cambiar por icono</TableCell>
                <TableCell>
                  <div>
                    <Button onPress={onOpenEdit} className='mx-1 my-1' color='secondary' variant='flat' onClick={() => handleEditClick(row)}>
                      <EditIcon/>
                    </Button>
                    <Button className='mx-1 my-1' color='danger' variant='flat' onPress={onOpenDelete} onClick={() => handleDeleteClick(row)}>
                      <DeleteIcon/>
                    </Button>
                  </div>
                </TableCell>
            </TableRow>
        ));
    };

    const handleNombreCertificadoChange = (e) => {
      const inputValue = e.target.value;
      if(isOpenEdit){
        setEditingData((prevData) => ({
          ...prevData,
          RFC: rfcUsuario,
          nombreCertificado: inputValue
        }))
      }
      setData((prevData) => ({
        ...prevData,
        RFC: rfcUsuario,
        nombreCertificado: inputValue,
      }));
    }
    const handleTipoCertificadoChange = (e) => {
      const inputValue = e.target.value;
      if(isOpenEdit){
        setEditingData((prevData) => ({
          ...prevData,
          RFC: rfcUsuario,
          tipoCertificado: inputValue
        }))
      }
      setData((prevData) => ({
        ...prevData,
        RFC: rfcUsuario,
        tipoCertificado: inputValue,
      }));
    }

    const handleButtonClick = () => {
      // Simular el clic en el input de tipo 'file'
      fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
      // Acceder al archivo seleccionado
      const selectedFile = e.target.files[0];
      setData((prevData) => ({
        ...prevData,
        RFC: rfcUsuario,
        certificado: selectedFile,
      }));
    };
    const handleSave = async () => {
      try {
        const response = await fetch('/api/usuario/curriculo/certificaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
          onClose();
        } else {
          console.log("Hubo un error al conectar con el api")
        }
      } catch (error) {
        console.log("Hubo un error al conectar con el api: ", error)
      }
  
    }
    const handleEditClick = (rowData) => {
      setEditingData({
        id: rowData.id,
        nombreCertificado: rowData.nombreCertificado,
        tipoCertificado: rowData.tipoCertificado,
        certificado: rowData.certificado,
      });
    };
    const handleEditSave = async () => {
      try {
        const response = await fetch(`/api/usuario/curriculo/certificaciones/${editingData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingData),
        });
  
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
          onClose();
        } else {
          console.log("Hubo un error al conectar con el api")
        }
      } catch (error) {
        console.log("Hubo un error al conectar con el api: ", error)
      }
    }
    const handleDeleteClick = (rowData) => {
      setDeletingData({
        id: rowData.id,
        nombreCertificado: rowData.nombreCertificado,
        tipoCertificado: rowData.tipoCertificado,
        certificado: rowData.certificado,
      });
    };
    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/usuario/curriculo/certificaciones/${deletingData.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deletingData),
        });
  
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
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
                <div className='w-2/3'>
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
                                <TableColumn>Nombre del certificado</TableColumn>
                                <TableColumn>Tipo de certificado</TableColumn>
                                <TableColumn>Certificado</TableColumn>
                                <TableColumn>Herramientas</TableColumn>
                            </TableHeader>
                            {isLoaded?(
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
                        <Spacer y={3}/>
                        <div className='flex'>
                          <Pagination
                            total={totalPages}
                            pageSize={1}
                            color="secondary"
                            current={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                          />
                          <Button className='mx-1' onPress={onOpenAdd}  color='danger' variant='bordered'>Añadir un registro</Button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='w-1/3'>
                    <CardU />
                </div>
                <Modal 
                  isOpen={isOpenAdd}
                  onOpenChange={onOpenChangeAdd}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Agregar un nuevo certificado</ModalHeader>
                        <ModalBody>
                          <Input
                            onChange={handleNombreCertificadoChange}
                            autoFocus
                            label="Nombre del certificado"
                            placeholder="Eje. Certificado de Marketing Digital"
                            variant="bordered"
                            color='success'
                          />
                          <Input
                            onChange={handleTipoCertificadoChange}
                            label="Tipo de certificado"
                            placeholder="Naturaleza del certificado"
                            variant="bordered"
                            color='success'
                          />
                          <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                          <Button color='secondary' onClick={handleButtonClick}>Subir certificado</Button>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="ghost" onPress={onClose}>
                            Cancelar
                          </Button>
                          <Button color="success" variant="ghost" onPress={onClose} onClick={handleSave}>
                            Guardar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <Modal 
                  isOpen={isOpenEdit}
                  onOpenChange={onOpenChangeEdit}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Editar un certificado</ModalHeader>
                        <ModalBody>
                          <Input
                            onChange={handleNombreCertificadoChange}
                            autoFocus
                            label="Nombre del certificado"
                            placeholder={editingData.nombreCertificado}
                            value={editingData.nombreCertificado}
                            variant="bordered"
                            color='success'
                          />
                          <Input
                            onChange={handleTipoCertificadoChange}
                            label="Tipo de certificado"
                            placeholder={editingData.tipoCertificado}
                            value={editingData.tipoCertificado}
                            variant="bordered"
                            color='success'
                          />
                          <Button color='secondary'>Subir certificado</Button>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="ghost" onPress={onClose}>
                            Cancelar
                          </Button>
                          <Button color="success" variant="ghost" onPress={onClose} onClick={handleEditSave}>
                            Guardar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <Modal 
                  isOpen={isOpenDelete}
                  onOpenChange={onOpenChangeDelete}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Eliminar un curso</ModalHeader>
                        <ModalBody>
                          <Input
                            isReadOnly
                            label="Nombre del curso"
                            placeholder={deletingData.nombreCertificado}
                            value={deletingData.nombreCertificado}
                            variant="bordered"
                            color='success'
                          />
                          <Input
                            isReadOnly
                            label="Tipo de curso"
                            placeholder={deletingData.tipoCertificado}
                            value={deletingData.tipoCertificado}
                            variant="bordered"
                            color='success'
                          />
                          <Button color='secondary'>Subir certificado</Button>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" variant="ghost" onPress={onClose}>
                            Cancelar
                          </Button>
                          <Button color="danger" variant="ghost" onPress={onClose} onClick={handleDelete}>
                            Eliminar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                  </div>
              </div>
    );
}

export default Certificaciones
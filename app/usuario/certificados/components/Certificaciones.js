import React, {useState, useEffect, useRef} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link} from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';
import { EditIcon } from '@/app/components/icons/EditIcon';
import { DeleteIcon } from '@/app/components/icons/DeleteIcon';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Certificaciones = ({ user, certificacion , isLoaded, fetchData, rfcUsuario}) => {
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const {toast} = useToast();
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
    
    const DownloadComponent = async (row) => {
      const id = row.id;
      const idUser = user.id
      try {
        const response = await fetch(`/api/usuario/file/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipoCert: 'certificado',
            idUser
          }),
        });
    
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `certificadoCertificacion_${id}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
          toast({
            title: "Guardado completado",
            description: "El archivo se ha descargado exitosamente",
          });
        } else {
          toast({
            title: "Error",
            description: "Ah ocurrido un error al bajar el archivo",
          });
        }
      } catch (error) {
        // Manejar errores de red u otros errores de cliente
        console.error('Error en la aplicación cliente:', error);
      }
    };
    const DeleteFileEdit = async () => {
      try{
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('RFC',rfcUsuario)
        formData.append('nombreCertificado',editingData.nombreCertificado)
        formData.append('tipoCertificado',editingData.tipoCertificado)
        formData.append('tipoCert', 'certificadoDel')
        const response = await fetch(`/api/usuario/curriculo/certificaciones/${editingData.id}`, {
          method: 'PUT',
          /*headers: {
            'Content-Type': 'application/json',
          },*/
          body: formData,
        });
  
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
          toast({
            title: "Certificado actualizado",
            description: "El certificado se ha eliminado exitosamente",
          });
          onClose();
        } else {
          console.log("Hubo un error al conectar con el api")
        }
      }catch(error){

      }
    }

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return certificacion.slice(startIndex, endIndex).map((row, index) => (
            <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombreCertificado}</TableCell>
                <TableCell>{row.tipoCertificado}</TableCell>
                <TableCell>{(row.certificado)?(
                  <a className={style.customLink} onClick={()=> DownloadComponent(row)} download>
                    Ver certificado
                  </a>

                ) : (
                "Subir certificado"
                )}
                </TableCell>
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
        //certificado: selectedFile,
      }));
      setSelectedFile(selectedFile);
      toast({
        title: "Archivo cargado",
        description: "El archivo se ha cargado en memoria",
      });
    };
    const handleSave = async () => {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('RFC',rfcUsuario)
        formData.append('nombreCertificado',data.nombreCertificado)
        formData.append('tipoCertificado',data.tipoCertificado)
        console.log(formData)
        const response = await fetch('/api/usuario/curriculo/certificaciones', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
          toast({
            title: "Guardado completado",
            description: "La certificacion se ha registrado exitosamente",
          });
          setSelectedFile(null)
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
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('RFC',rfcUsuario)
        formData.append('nombreCertificado',editingData.nombreCertificado)
        formData.append('tipoCertificado',editingData.tipoCertificado)
        formData.append('tipoCert', 'certificado')
        const response = await fetch(`/api/usuario/curriculo/certificaciones/${editingData.id}`, {
          method: 'PUT',
          /*headers: {
            'Content-Type': 'application/json',
          }*/
          body: formData,
        });
  
        if (response.ok) {
          renderTableRows();
          fetchData();
          setCurrentPage(currentPage)
          toast({
            title: "Guardado completado",
            description: "Los cambios se han guardado exitosamente",
          });
          setSelectedFile(null)
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
          toast({
            title: "Eliminado completado",
            description: "La certificacion se ha eliminado exitosamente",
          });
        } else {
          console.log("Hubo un error al conectar con el api")
        }
      } catch (error) {
        console.log("Hubo un error al conectar con el api: ", error)
      }
    }


    useEffect(() => {
      console.log(selectedFile)
    }, [selectedFile])
    
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
                    <CardU user = {user}/>
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
                          <Button color='secondary' onClick={handleButtonClick}>{selectedFile ? "Archivo cargado" : "Seleccionar archivo"}</Button>
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
                          <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                          <Button color='secondary' onClick={editingData.certificado ? DeleteFileEdit : handleButtonClick}>
                            {editingData.certificado || selectedFile ? "Eliminar certificado" : "Subir certificado"}
                          </Button>
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
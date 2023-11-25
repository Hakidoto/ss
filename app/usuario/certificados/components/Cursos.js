import React, {useState, useEffect, useRef} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link} from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';
import { EditIcon } from '@/app/components/icons/EditIcon';
import { DeleteIcon } from '@/app/components/icons/DeleteIcon';

const Cursos = ({cursos , isLoaded, fetchData, rfcUsuario}) => {
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    //const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
    const [editingData, setEditingData] = useState({
      id: null,
      nombreCurso: '',
      tipoCurso: '',
      certificado: null
    });
    const [deletingData, setDeletingData] = useState({
      id: null,
      nombreCurso: '',
      tipoCurso: '',
      certificado: null
    });
    const [data, setData] = useState({});
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(cursos.length / itemsPerPage);
    const fileInputRef = useRef(null);

    const renderTableRows = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return cursos.slice(startIndex, endIndex).map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.nombreCurso}</TableCell>
          <TableCell>{row.tipoCurso}</TableCell>
          <TableCell>{(row.certificado)?"Ver certificado" : "Subir certificado"}</TableCell>
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

    const handleNombreCursoChange = (e) => {
      const inputValue = e.target.value;
      if(isOpenEdit){
        setEditingData((prevData) => ({
          ...prevData,
          RFC: rfcUsuario,
          nombreCurso: inputValue
        }))
      }
      setData((prevData) => ({
        ...prevData,
        RFC: rfcUsuario,
        nombreCurso: inputValue,
      }));
    }
    const handleTipoCursoChange = (e) => {
      const inputValue = e.target.value;
      if(isOpenEdit){
        setEditingData((prevData) => ({
          ...prevData,
          RFC: rfcUsuario,
          tipoCurso: inputValue
        }))
      }
      setData((prevData) => ({
        ...prevData,
        RFC: rfcUsuario,
        tipoCurso: inputValue,
      }));
    }
    const handleSave = async () => {
      try {
        const response = await fetch('/api/usuario/curriculo/cursos', {
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
        nombreCurso: rowData.nombreCurso,
        tipoCurso: rowData.tipoCurso,
        certificado: rowData.certificado,
      });
    };
    const handleEditSave = async () => {
      try {
        const response = await fetch(`/api/usuario/curriculo/cursos/${editingData.id}`, {
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
        nombreCurso: rowData.nombreCurso,
        tipoCurso: rowData.tipoCurso,
        certificado: rowData.certificado,
      });
    };
    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/usuario/curriculo/cursos/${deletingData.id}`, {
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
                    <TableColumn>Nombre del curso</TableColumn>
                    <TableColumn>Tipo de curso</TableColumn>
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
                  <ModalHeader className="flex flex-col gap-1">Agregar un nuevo curso</ModalHeader>
                  <ModalBody>
                    <Input
                      onChange={handleNombreCursoChange}
                      autoFocus
                      label="Nombre del curso"
                      placeholder="Eje. Curso de Marketing Digital"
                      variant="bordered"
                      color='success'
                    />
                    <Input
                      onChange={handleTipoCursoChange}
                      label="Tipo de curso"
                      placeholder="Naturaleza del curso"
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
                  <ModalHeader className="flex flex-col gap-1">Editar un curso</ModalHeader>
                  <ModalBody>
                    <Input
                      onChange={handleNombreCursoChange}
                      autoFocus
                      label="Nombre del curso"
                      placeholder={editingData.nombreCurso}
                      value={editingData.nombreCurso}
                      variant="bordered"
                      color='success'
                    />
                    <Input
                      onChange={handleTipoCursoChange}
                      label="Tipo de curso"
                      placeholder={editingData.tipoCurso}
                      value={editingData.tipoCurso}
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
                      placeholder={deletingData.nombreCurso}
                      value={deletingData.nombreCurso}
                      variant="bordered"
                      color='success'
                    />
                    <Input
                      isReadOnly
                      label="Tipo de curso"
                      placeholder={deletingData.tipoCurso}
                      value={deletingData.tipoCurso}
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

export default Cursos
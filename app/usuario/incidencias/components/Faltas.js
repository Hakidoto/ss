import React, {useState, useRef} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton,useDisclosure } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Faltas = ({user, faltas, loading, fetchData, rfcUsuario}) => {
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
    const totalPages = Math.ceil(faltas.length / itemsPerPage);

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return faltas.slice(startIndex, endIndex).map((row, index) => (
            <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>S/M</TableCell>
            </TableRow>
        ));
    };

    return (
        <div className={`${style.personalData}`}>
            <div className={`flex justify-between h-full ${style.prueba}`}>
                <div className='w-1/2'>
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
                                <TableColumn>Fecha</TableColumn>
                                <TableColumn>Motivo (Opcional)</TableColumn>
                            </TableHeader>
                            {loading?(
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
                        <Pagination
                            total={totalPages}
                            pageSize={1}
                            color="secondary"
                            current={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
                <hr />
                <div className='w-1/2'>
                    <CardU user = {user} />
                </div>
            </div>
        </div>
    );
}

export default Faltas
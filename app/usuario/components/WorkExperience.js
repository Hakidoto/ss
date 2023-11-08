import React, { useState, useEffect } from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton } from '@nextui-org/react';

const WorkExperience = ({userExp, loading}) => {

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(userExp.length / itemsPerPage);

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
            </TableRow>
        ));
    };

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
                <div className='w-1/4'>
                    <CardU />
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;

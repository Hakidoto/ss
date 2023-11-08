import React, {useState, useEffect} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Cursos = ({cursos , isLoaded}) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(cursos.length / itemsPerPage);

    const renderTableRows = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return cursos.slice(startIndex, endIndex).map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.nombreCurso}</TableCell>
          <TableCell>{row.tipoCurso}</TableCell>
          <TableCell>{(row.certificado)?row.certificado : "Subir certificado"}</TableCell>
        </TableRow>
      ));
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
          <div className='w-1/3'>
              <CardU />
          </div>
        </div>
      </div>
    );
}

export default Cursos
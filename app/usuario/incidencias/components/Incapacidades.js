import React, {useState} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer, Skeleton } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Incapacidades = ({incapacidades, loading}) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(incapacidades.length / itemsPerPage);

    const DownloadComponent = async (row) => {
      const id = row.id;
    
      try {
        const response = await fetch(`/api/usuario/file/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipoCert: 'incapacidad',
          }),
        });
    
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `justificanteIncapacidad_${id}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        } else {
          alert("Ocurrio un error al bajar el archivo del servidor")
        }
      } catch (error) {
        // Manejar errores de red u otros errores de cliente
        console.error('Error en la aplicación cliente:', error);
      }
    };


    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return incapacidades.slice(startIndex, endIndex).map((row, index) => (
            <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fechaInicio}</TableCell>
                <TableCell>{row.fechaFin}</TableCell>
                <TableCell>{row.tipoFalta}</TableCell>
                <TableCell>{(row.justificante)?(
                  <a className={style.customLink} onClick={()=> DownloadComponent(row)} download>
                    Ver justificante
                  </a>

                ) : (
                "Sin justificante aprobado"
                )}
                </TableCell>
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
                                <TableColumn>Fecha de inicio</TableColumn>
                                <TableColumn>Fecha fin</TableColumn>
                                <TableColumn>Tipo</TableColumn>
                                <TableColumn>justificante</TableColumn>
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
                    <CardU />
                </div>
            </div>
        </div>
    );
}

export default Incapacidades
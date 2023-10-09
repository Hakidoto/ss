import React, {useState} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Procesos = () => {
    const itemsPerPage = 5;
    const data = [
        {
          no: 1,
          fechaInicio: "2023-02-23",
          fechaFin: "2023-02-26",
          tipo: "Proceso administrativo",
          estado: "Activo"
        },
        {
          no: 2,
          fechaInicio: "2023-02-23",
          fechaFin: "2023-02-26",
          tipo: "Investigacion",
          estado: "En proceso"
        },
        {
          no: 3,
          fechaInicio: "2023-02-23",
          fechaFin: "2023-02-26",
          tipo: "Medida cautelar",
          estado: "Finalizado"
        },
        // Agrega más objetos para representar tus datos aquí
      ];
      

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex).map((row, index) => (
            <TableRow key={index}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.fechaInicio}</TableCell>
                <TableCell>{row.fechaFin}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.estado}</TableCell>
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
                                <TableColumn>Estado</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {renderTableRows()}
                            </TableBody>
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

export default Procesos
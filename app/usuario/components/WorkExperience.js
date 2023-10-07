import React, { useState } from 'react';
import style from './style/statusData.module.css';
import CardU from './CardU';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer } from '@nextui-org/react';

const WorkExperience = () => {
    const itemsPerPage = 5;
    const data = [
        {
          no: 1,
          nombre: "Taxista",
          permanencia: "3 años",
          fechaInicio: "12/03/2023",
          fechaTermino: "12/03/2026",
        },
        {
          no: 2,
          nombre: "Zoey Lang",
          permanencia: "Technical Lead",
          fechaInicio: "Paused",
          fechaTermino: "CEO",
        },
        {
          no: 3,
          nombre: "Jane Fisher",
          permanencia: "Senior Developer",
          fechaInicio: "Active",
          fechaTermino: "CEO",
        },
        {
          no: 4,
          nombre: "William Howard",
          permanencia: "Community Manager",
          fechaInicio: "Vacation",
          fechaTermino: "CEO",
        },
        {
            no: 5,
            nombre: "Taxista",
            permanencia: "3 años",
            fechaInicio: "12/03/2023",
            fechaTermino: "12/03/2026",
          },
          {
            no: 6,
            nombre: "Zoey Lang",
            permanencia: "Technical Lead",
            fechaInicio: "Paused",
            fechaTermino: "CEO",
          },
          {
            no: 7,
            nombre: "Jane Fisher",
            permanencia: "Senior Developer",
            fechaInicio: "Active",
            fechaTermino: "CEO",
          },
          {
            no: 8,
            nombre: "William Howard",
            permanencia: "Community Manager",
            fechaInicio: "Vacation",
            fechaTermino: "CEO",
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
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.permanencia}</TableCell>
                <TableCell>{row.fechaInicio}</TableCell>
                <TableCell>{row.fechaTermino}</TableCell>
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
                                <TableColumn>Nombre del empleo</TableColumn>
                                <TableColumn>Permanencia</TableColumn>
                                <TableColumn>Fecha inicio</TableColumn>
                                <TableColumn>Fecha termino</TableColumn>
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
};

export default WorkExperience;

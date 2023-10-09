import React, {useState} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Certificaciones = () => {
    const itemsPerPage = 5;
    const data = [
        {
          no: 1,
          nombre: "Offimatica",
          tipo: "Brindado por el organismo",
          certificado: "8150252",
        },
        {
          no: 2,
          nombre: "Ejemplo 2",
          tipo: "Tipo 2",
          certificado: "1234567",
        },
        {
          no: 3,
          nombre: "Ejemplo 3",
          tipo: "Tipo 3",
          certificado: "2345678",
        },
        {
          no: 4,
          nombre: "Ejemplo 4",
          tipo: "Tipo 4",
          certificado: "3456789",
        },
        {
          no: 5,
          nombre: "Ejemplo 5",
          tipo: "Tipo 5",
          certificado: "4567890",
        },
        {
          no: 6,
          nombre: "Ejemplo 6",
          tipo: "Tipo 6",
          certificado: "5678901",
        },
        {
          no: 7,
          nombre: "Ejemplo 7",
          tipo: "Tipo 7",
          certificado: "6789012",
        },
        {
          no: 8,
          nombre: "Ejemplo 8",
          tipo: "Tipo 8",
          certificado: "7890123",
        },
        {
          no: 9,
          nombre: "Ejemplo 9",
          tipo: "Tipo 9",
          certificado: "8901234",
        },
        {
          no: 10,
          nombre: "Ejemplo 10",
          tipo: "Tipo 10",
          certificado: "9012345",
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
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.certificado}</TableCell>
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
                                <TableColumn>Nombre del certificado</TableColumn>
                                <TableColumn>Tipo de certificado</TableColumn>
                                <TableColumn>Certificado</TableColumn>
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

export default Certificaciones
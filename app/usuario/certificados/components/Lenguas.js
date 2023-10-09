import React, {useState} from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spacer } from '@nextui-org/react';
import style from '../../components/style/statusData.module.css'
import CardU from '../../components/CardU';

const Lenguas = () => {
    const itemsPerPage = 5;
    const data = [
        {
          no: 1,
          lengua: "Ingles",
          nivel: "C2",
          certificado: "8150252",
        },
        {
          no: 2,
          lengua: "Frances",
          nivel: "B2",
          certificado: "1234567",
        },
        {
          no: 3,
          lengua: "Aleman",
          nivel: "A1",
          certificado: "2345678",
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
                <TableCell>{row.lengua}</TableCell>
                <TableCell>{row.nivel}</TableCell>
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
                                <TableColumn>Lengua</TableColumn>
                                <TableColumn>Nivel</TableColumn>
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

export default Lenguas
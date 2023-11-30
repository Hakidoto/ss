import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Link from "next/link";

export const PanelUsuario = () => {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Obtener los usuarios desde la API al montar el componente
    async function fetchUsers() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const fetchedUsers = await res.json();
          setUsers(fetchedUsers);
        } else {
          console.error("Error fetching users:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((usrs) =>
    usrs.nombre.toLowerCase().includes(filterValue.toLowerCase())
  );


  return (
    <>
      <Input
        type="text"
        placeholder="Filtrar por nombre de usuario"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <Table bordered>
        <TableHeader>
          <TableColumn align="center">ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Edad</TableColumn>
          <TableColumn>Celular</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.correo}</TableCell>
              <TableCell>{user.edad}</TableCell>
              <TableCell>{user.celular}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
